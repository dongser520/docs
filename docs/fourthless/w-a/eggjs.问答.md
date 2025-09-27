---
navbar: true
sidebar: auto
title: eggjs问答系统
---

## 一、eggjs问答系统(控制器 `/app/controller/api/chat/askanswer.js` 完整代码)


```js
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class AskanswerController extends Controller {
  // 获取文件路径
  getFilePath(type, createUserId) {
    const baseDir = this.config.baseDir;
    const dirPath = path.join(baseDir, 'data', 'askAnswer');
    
    // 确保目录存在
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    return path.join(dirPath, `chatuser_${type}_${createUserId}.json`);
  }
  
  // 读取文件数据
  readFileData(filePath) {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      this.ctx.logger.error('读取问答文件失败:', error);
      return [];
    }
  }
  
  // 写入文件数据
  writeFileData(filePath, data) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      this.ctx.logger.error('写入问答文件失败:', error);
      return false;
    }
  }
  
  // 搜索问答 - 新增方法
  async search() {
    const { ctx } = this;
    const { type, create_userId, ask } = ctx.request.body;
    
    if (!type || !create_userId || !ask) {
      ctx.body = {
        code: 400,
        msg: '参数不完整'
      };
      return;
    }
    
    try {
      const filePath = this.getFilePath(type, create_userId);
      const questions = this.readFileData(filePath);
      
      if (questions.length === 0) {
        ctx.body = {
          code: 404,
          msg: '暂无问答数据'
        };
        return;
      }
      
      // 模糊匹配算法
      const searchKeywords = ask.toLowerCase().split(/\s+/).filter(k => k.length > 0);
      let bestMatch = null;
      let highestScore = 0;
      
      // 计算匹配度评分
      questions.forEach(question => {
        let score = 0;
        const questionText = (question.ask + ' ' + question.answer).toLowerCase();
        
        // 1. 完全匹配 - 最高优先级
        if (question.ask.toLowerCase().includes(ask.toLowerCase()) || 
            question.answer.toLowerCase().includes(ask.toLowerCase())) {
          score += 100;
        }
        
        // 2. 关键词匹配
        searchKeywords.forEach(keyword => {
          // 问题中包含关键词
          if (question.ask.toLowerCase().includes(keyword)) {
            score += 10;
          }
          
          // 回答中包含关键词
          if (question.answer.toLowerCase().includes(keyword)) {
            score += 5;
          }
          
          // 计算关键词出现次数
          const askCount = (question.ask.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
          const answerCount = (question.answer.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
          score += (askCount * 2) + answerCount;
        });
        
        // 3. 长度相似度 - 问题长度越接近搜索词，得分越高
        const lengthDiff = Math.abs(question.ask.length - ask.length);
        score += Math.max(0, 10 - lengthDiff / 5);
        
        // 4. 时效性 - 较新的内容得分更高
        const daysSinceUpdate = (Date.now() - question.update_time) / (1000 * 60 * 60 * 24);
        score += Math.max(0, 5 - daysSinceUpdate / 10);
        
        // 5. 热门度 - 点赞多的内容得分更高
        score += Math.min(question.likeCount || 0, 10);
        
        // 更新最佳匹配
        if (score > highestScore) {
          highestScore = score;
          bestMatch = question;
        }
      });
      
      // 设置匹配阈值，避免低质量匹配
      const threshold = searchKeywords.length * 5;
      
      if (bestMatch && highestScore >= threshold) {
        ctx.body = {
          code: 200,
          data: bestMatch,
          score: highestScore, // 返回匹配度评分，便于前端调试
          msg: '搜索成功'
        };
      } else {
        // 如果没有找到合适匹配，尝试使用更宽松的匹配方式
        const fallbackMatch = this.fallbackSearch(questions, ask);
        if (fallbackMatch) {
          ctx.body = {
            code: 200,
            data: fallbackMatch,
            score: 5, // 较低的匹配度
            msg: '找到相关回答'
          };
        } else {
          ctx.body = {
            code: 404,
            msg: '未找到相关问答'
          };
        }
      }
    } catch (error) {
      ctx.logger.error('搜索问答失败:', error);
      ctx.body = {
        code: 500,
        msg: '搜索失败'
      };
    }
  }
  
  // 备用搜索方法 - 使用更宽松的匹配规则
  fallbackSearch(questions, ask) {
    const searchText = ask.toLowerCase();
    
    // 尝试部分匹配
    for (const question of questions) {
      const questionText = (question.ask + ' ' + question.answer).toLowerCase();
      
      // 检查是否包含搜索词的主要部分
      const words = searchText.split(/\s+/).filter(w => w.length > 2);
      let matchCount = 0;
      
      for (const word of words) {
        if (questionText.includes(word)) {
          matchCount++;
        }
      }
      
      // 如果超过一半的关键词匹配，认为是相关结果
      if (matchCount >= Math.ceil(words.length / 2)) {
        return question;
      }
    }
    
    // 尝试同义词匹配（简单实现）
    const synonymMap = {
      '怎么': '如何',
      '哪里': '何处',
      '什么': '啥',
      '为什么': '为何',
      '怎么办': '如何处理'
    };
    
    let synonymText = searchText;
    Object.keys(synonymMap).forEach(key => {
      synonymText = synonymText.replace(new RegExp(key, 'g'), synonymMap[key]);
    });
    
    if (synonymText !== searchText) {
      for (const question of questions) {
        const questionText = (question.ask + ' ' + question.answer).toLowerCase();
        if (questionText.includes(synonymText)) {
          return question;
        }
      }
    }
    
    return null;
  }
  
  // 创建问答
  async create() {
    const { ctx } = this;
    const { ask, answer, type, create_userId } = ctx.request.body;
    
    if (!ask || !answer || !type || !create_userId) {
      ctx.body = {
        code: 400,
        msg: '参数不完整'
      };
      return;
    }
    
    try {
      const filePath = this.getFilePath(type, create_userId);
      const questions = this.readFileData(filePath);
      
      // 检查是否已存在相同问题
      const existingIndex = questions.findIndex(q => q.ask === ask);
      const now = Date.now();
      
      if (existingIndex !== -1) {
        // 更新已存在的问题
        questions[existingIndex] = {
          ...questions[existingIndex],
          answer,
          update_time: now
        };
      } else {
        // 创建新问题
        const newQuestion = {
          id: now, // 使用时间戳作为ID
          ask,
          answer,
          type,
          create_userId,
          create_time: now,
          update_time: now,
          likeCount: 0,
          liked: false
        };
        
        questions.unshift(newQuestion);
      }
      
      // 写入文件
      const success = this.writeFileData(filePath, questions);
      
      if (success) {
        ctx.body = {
          code: 200,
          msg: existingIndex !== -1 ? '问答已更新' : '问答创建成功'
        };
      } else {
        ctx.body = {
          code: 500,
          msg: '保存失败'
        };
      }
    } catch (error) {
      ctx.logger.error('创建问答失败:', error);
      ctx.body = {
        code: 500,
        msg: '服务器错误'
      };
    }
  }
  
  // 更新问答
  async update() {
    const { ctx } = this;
    const { id, ask, answer, type, create_userId } = ctx.request.body;
    
    if (!id || !ask || !answer || !type || !create_userId) {
      ctx.body = {
        code: 400,
        msg: '参数不完整'
      };
      return;
    }
    
    try {
      const filePath = this.getFilePath(type, create_userId);
      const questions = this.readFileData(filePath);
      
      const questionIndex = questions.findIndex(q => q.id === id);
      
      if (questionIndex === -1) {
        ctx.body = {
          code: 404,
          msg: '问答不存在'
        };
        return;
      }
      
      // 更新问答
      questions[questionIndex] = {
        ...questions[questionIndex],
        ask,
        answer,
        update_time: Date.now()
      };
      
      // 写入文件
      const success = this.writeFileData(filePath, questions);
      
      if (success) {
        ctx.body = {
          code: 200,
          msg: '更新成功'
        };
      } else {
        ctx.body = {
          code: 500,
          msg: '更新失败'
        };
      }
    } catch (error) {
      ctx.logger.error('更新问答失败:', error);
      ctx.body = {
        code: 500,
        msg: '服务器错误'
      };
    }
  }
  
  // 删除问答
  async delete() {
    const { ctx } = this;
    const { id, type, create_userId } = ctx.request.body;
    
    if (!id) {
      ctx.body = {
        code: 400,
        msg: '参数不完整'
      };
      return;
    }
    
    try {
      // 如果没有提供type和create_userId，需要遍历所有可能的文件
      if (!type || !create_userId) {
        const baseDir = this.config.baseDir;
        const dirPath = path.join(baseDir, 'data', 'askAnswer');
        
        if (!fs.existsSync(dirPath)) {
          ctx.body = {
            code: 404,
            msg: '问答不存在'
          };
          return;
        }
        
        const files = fs.readdirSync(dirPath);
        let deleted = false;
        
        for (const file of files) {
          if (file.endsWith('.json')) {
            const filePath = path.join(dirPath, file);
            const questions = this.readFileData(filePath);
            const filteredQuestions = questions.filter(q => q.id !== id);
            
            if (filteredQuestions.length !== questions.length) {
              this.writeFileData(filePath, filteredQuestions);
              deleted = true;
              break;
            }
          }
        }
        
        if (deleted) {
          ctx.body = {
            code: 200,
            msg: '删除成功'
          };
        } else {
          ctx.body = {
            code: 404,
            msg: '问答不存在'
          };
        }
      } else {
        // 直接定位到特定文件
        const filePath = this.getFilePath(type, create_userId);
        
        if (!fs.existsSync(filePath)) {
          ctx.body = {
            code: 404,
            msg: '问答不存在'
          };
          return;
        }
        
        const questions = this.readFileData(filePath);
        const filteredQuestions = questions.filter(q => q.id !== id);
        
        if (filteredQuestions.length === questions.length) {
          ctx.body = {
            code: 404,
            msg: '问答不存在'
          };
          return;
        }
        
        const success = this.writeFileData(filePath, filteredQuestions);
        
        if (success) {
          ctx.body = {
            code: 200,
            msg: '删除成功'
          };
        } else {
          ctx.body = {
            code: 500,
            msg: '删除失败'
          };
        }
      }
    } catch (error) {
      ctx.logger.error('删除问答失败:', error);
      ctx.body = {
        code: 500,
        msg: '服务器错误'
      };
    }
  }
  
  // 获取问答列表
  async list() {
    const { ctx } = this;
    const { type, userId } = ctx.request.body;
    
    if (!type || !userId) {
      ctx.body = {
        code: 400,
        msg: '参数不完整'
      };
      return;
    }
    
    try {
      const filePath = this.getFilePath(type, userId);
      const questions = this.readFileData(filePath);
      
      ctx.body = {
        code: 200,
        data: questions,
        msg: '获取成功'
      };
    } catch (error) {
      ctx.logger.error('获取问答列表失败:', error);
      ctx.body = {
        code: 500,
        msg: '服务器错误'
      };
    }
  }
  
  // 获取问答详情
  async detail() {
    const { ctx } = this;
    const { id, type, create_userId } = ctx.request.body;
    
    if (!id) {
      ctx.body = {
        code: 400,
        msg: '参数不完整'
      };
      return;
    }
    
    try {
      let question = null;
      
      // 如果没有提供type和create_userId，需要遍历所有可能的文件
      if (!type || !create_userId) {
        const baseDir = this.config.baseDir;
        const dirPath = path.join(baseDir, 'data', 'askAnswer');
        
        if (fs.existsSync(dirPath)) {
          const files = fs.readdirSync(dirPath);
          
          for (const file of files) {
            if (file.endsWith('.json')) {
              const filePath = path.join(dirPath, file);
              const questions = this.readFileData(filePath);
              question = questions.find(q => q.id === id);
              
              if (question) break;
            }
          }
        }
      } else {
        // 直接定位到特定文件
        const filePath = this.getFilePath(type, create_userId);
        
        if (fs.existsSync(filePath)) {
          const questions = this.readFileData(filePath);
          question = questions.find(q => q.id === id);
        }
      }
      
      if (question) {
        ctx.body = {
          code: 200,
          data: question,
          msg: '获取成功'
        };
      } else {
        ctx.body = {
          code: 404,
          msg: '问答不存在'
        };
      }
    } catch (error) {
      ctx.logger.error('获取问答详情失败:', error);
      ctx.body = {
        code: 500,
        msg: '服务器错误'
      };
    }
  }
}

module.exports = AskanswerController;
```