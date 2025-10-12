---
navbar: true
sidebar: auto
title: 投诉表：`chat_complaint`[投诉群或者用户]
---

## 一、 迁移文件
### 1.创建迁移文件
```js
npx sequelize migration:generate --name=chat_complaint
```

### 2. 迁移文件代码

```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, INTEGER, TEXT, DATE, ENUM, TINYINT } = Sequelize;
    
    await queryInterface.createTable('chat_complaint', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键ID'
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        comment: '投诉用户ID'
      },
      target_id: {
        type: INTEGER,
        allowNull: false,
        comment: '被投诉目标ID'
      },
      target_type: {
        type: ENUM('group', 'single'),
        allowNull: false,
        comment: '目标类型：group-群聊，single-用户'
      },
      target_name: {
        type: STRING(255),
        allowNull: true,
        defaultValue: '',
        comment: '被投诉目标名称'
      },
      reason: {
        type: STRING(500),
        allowNull: false,
        comment: '投诉原因'
      },
      content: {
        type: TEXT,
        allowNull: true,
        comment: '投诉详细内容'
      },
      images: {
        type: TEXT,
        allowNull: true,
        comment: '图片证据JSON数组'
      },
      complaint_chatinfo: {
        type: TEXT,
        allowNull: true,
        comment: '聊天证据JSON数组'
      },
      status: {
        type: TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '状态：0-待处理，1-处理中，2-已处理，3-已关闭'
      },
      admin_reply: {
        type: TEXT,
        allowNull: true,
        comment: '管理员回复'
      },
      create_time: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '创建时间'
      },
      update_time: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment: '更新时间'
      },
      is_deleted: {
        type: TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '是否删除：0-否，1-是'
      }
    }, {
      engine: 'InnoDB',
      charset: 'utf8mb4',
      comment: '投诉记录表',
      indexes: [
        {
          name: 'idx_user_id',
          fields: ['user_id']
        },
        {
          name: 'idx_target',
          fields: ['target_id', 'target_type']
        },
        {
          name: 'idx_status',
          fields: ['status']
        },
        {
          name: 'idx_create_time',
          fields: ['create_time']
        }
      ]
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chat_complaint');
  }
};
```



### 3. 迁移命令
```js
// 创建数据库表
npx sequelize db:migrate
// 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
npx sequelize db:migrate:undo
// 可以通过 `db:migrate:undo:all` 回退到初始状态
npx sequelize db:migrate:undo:all
```

## 二、模型

`/app/model/chat_complaint.js`


```js
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE, ENUM, TINYINT } = app.Sequelize;

  const ChatComplaint = app.model.define('chat_complaint', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID'
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      comment: '投诉用户ID'
    },
    target_id: {
      type: INTEGER,
      allowNull: false,
      comment: '被投诉目标ID'
    },
    target_type: {
      type: ENUM('group', 'single'),
      allowNull: false,
      comment: '目标类型：group-群聊，single-用户'
    },
    target_name: {
      type: STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '被投诉目标名称'
    },
    reason: {
      type: STRING(500),
      allowNull: false,
      comment: '投诉原因'
    },
    content: {
      type: TEXT,
      allowNull: true,
      comment: '投诉详细内容'
    },
    images: {
      type: TEXT,
      allowNull: true,
      comment: '图片证据JSON数组',
      get() {
        const rawValue = this.getDataValue('images');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('images', value ? JSON.stringify(value) : '[]');
      }
    },
    complaint_chatinfo: {
      type: TEXT,
      allowNull: true,
      comment: '聊天证据JSON数组',
      get() {
        const rawValue = this.getDataValue('complaint_chatinfo');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('complaint_chatinfo', value ? JSON.stringify(value) : '[]');
      }
    },
    status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '状态：0-待处理，1-处理中，2-已处理，3-已关闭'
    },
    admin_reply: {
      type: TEXT,
      allowNull: true,
      comment: '管理员回复'
    },
    create_time: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建时间'
    },
    update_time: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      comment: '更新时间'
    },
    is_deleted: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否删除：0-否，1-是'
    }
  }, {
    tableName: 'chat_complaint',
    engine: 'InnoDB',
    charset: 'utf8mb4',
    comment: '投诉记录表',
    timestamps: false, // 不使用Sequelize的自动时间戳
    hooks: {
      beforeValidate(complaint) {
        if (!complaint.target_name) {
          complaint.target_name = '';
        }
        if (!complaint.images) {
          complaint.images = '[]';
        }
        if (!complaint.complaint_chatinfo) {
          complaint.complaint_chatinfo = '[]';
        }
      }
    }
  });

  // 定义关联关系
  ChatComplaint.associate = function() {
    // 投诉属于用户
    ChatComplaint.belongsTo(app.model.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user'
    });
  };

  // 状态常量
  ChatComplaint.STATUS = {
    PENDING: 0,    // 待处理
    PROCESSING: 1, // 处理中
    RESOLVED: 2,   // 已处理
    CLOSED: 3      // 已关闭
  };

  // 类型常量
  ChatComplaint.TARGET_TYPE = {
    GROUP: 'group',
    SINGLE: 'single'
  };

  return ChatComplaint;
};
```



## 三、控制器
`/app/controller/api/chat/complaint.js`

```js
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class ComplaintController extends Controller {
  // 创建投诉
  async create() {
    const { ctx } = this;
    try {
      const { target_id, target_type, target_name, reason, content, images, complaint_chatinfo } = ctx.request.body;
      const user_id = ctx.chat_user.id;
      
      // 验证必填字段
      if (!target_id || !target_type || !reason) {
        return ctx.apiFail({}, '缺少必要参数');
      }
      
      // 创建投诉记录
      const complaintData = {
        user_id,
        target_id: parseInt(target_id),
        target_type,
        target_name: target_name || '',
        reason,
        content: content || '',
        images: images || '[]',
        complaint_chatinfo: complaint_chatinfo || '[]',
        status: 0, // 0-待处理, 1-处理中, 2-已处理, 3-已关闭
        create_time: new Date(),
        update_time: new Date()
      };
      
      // 写入数据库
      const result = await ctx.service.complaint.create(complaintData);
      
      // 同时写入JSON文件备份
      await this.writeToJsonFile(complaintData, user_id, target_type);
      
      return ctx.apiSuccess({ id: result.id }, '投诉提交成功');
      
    } catch (error) {
      ctx.logger.error('创建投诉失败:', error);
      return ctx.apiFail({}, '投诉提交失败');
    }
  }
  
  // 获取投诉列表
  async list() {
    const { ctx } = this;
    try {
      const user_id = ctx.chat_user.id;
      const complaints = await ctx.service.complaint.getByUserId(user_id);
      
      // 格式化返回数据
      const formattedComplaints = complaints.map(item => {
        const complaint = item.toJSON();
        return {
          ...complaint,
          user: complaint.user ? {
            id: complaint.user.id,
            uuid: complaint.user.uuid,
            username: complaint.user.username,
            nickname: complaint.user.nickname,
            avatar: complaint.user.avatar
          } : null
        };
      });
      
      return ctx.apiSuccess(formattedComplaints, '获取成功');
      
    } catch (error) {
      ctx.logger.error('获取投诉列表失败:', error);
      return ctx.apiFail({}, '获取失败');
    }
  }
  
  // 获取投诉详情
  async detail() {
    const { ctx } = this;
    try {
      const { id } = ctx.params;
      const user_id = ctx.chat_user.id;
      
      const complaint = await ctx.service.complaint.getById(id, user_id);
      
      if (!complaint) {
        return ctx.apiFail({}, '投诉记录不存在');
      }
      
      // 格式化返回数据
      const formattedComplaint = complaint.toJSON();
      const result = {
        ...formattedComplaint,
        user: formattedComplaint.user ? {
          id: formattedComplaint.user.id,
          uuid: formattedComplaint.user.uuid,
          username: formattedComplaint.user.username,
          nickname: formattedComplaint.user.nickname,
          avatar: formattedComplaint.user.avatar
        } : null
      };
      
      return ctx.apiSuccess(result, '获取成功');
      
    } catch (error) {
      ctx.logger.error('获取投诉详情失败:', error);
      return ctx.apiFail({}, '获取失败');
    }
  }
  
  // 更新投诉
  async update() {
    const { ctx } = this;
    try {
      const { id } = ctx.params;
      const { content, images } = ctx.request.body;
      const user_id = ctx.chat_user.id;
      
      // 检查投诉记录是否存在且属于当前用户
      const complaint = await ctx.service.complaint.getById(id, user_id);
      if (!complaint) {
        return ctx.apiFail({}, '投诉记录不存在');
      }
      
      // 只能更新待处理的投诉
      if (complaint.status !== 0) {
        return ctx.apiFail({}, '该投诉已开始处理，无法修改');
      }
      
      const updateData = {
        content: content || complaint.content,
        images: images || complaint.images,
        update_time: new Date()
      };
      
      const success = await ctx.service.complaint.update(id, updateData, user_id);
      
      if (!success) {
        return ctx.apiFail({}, '更新失败');
      }
      
      return ctx.apiSuccess({}, '更新成功');
      
    } catch (error) {
      ctx.logger.error('更新投诉失败:', error);
      return ctx.apiFail({}, '更新失败');
    }
  }
  
  // 删除投诉
  async delete() {
    const { ctx } = this;
    try {
      const { id } = ctx.params;
      const user_id = ctx.chat_user.id;
      
      // 检查投诉记录是否存在且属于当前用户
      const complaint = await ctx.service.complaint.getById(id, user_id);
      if (!complaint) {
        return ctx.apiFail({}, '投诉记录不存在');
      }
      
      const success = await ctx.service.complaint.delete(id, user_id);
      
      if (!success) {
        return ctx.apiFail({}, '删除失败');
      }
      
      return ctx.apiSuccess({}, '删除成功');
      
    } catch (error) {
      ctx.logger.error('删除投诉失败:', error);
      return ctx.apiFail({}, '删除失败');
    }
  }
  
  // 管理员更新投诉状态
  async updateStatus() {
    const { ctx } = this;
    try {
      const { id } = ctx.params;
      const { status, admin_reply } = ctx.request.body;
      
      // 检查用户权限
      if (ctx.chat_user.role !== 'admin') {
        return ctx.apiFail({}, '无权限操作');
      }
      
      const success = await ctx.service.complaint.updateStatus(id, status, admin_reply);
      
      if (!success) {
        return ctx.apiFail({}, '更新状态失败');
      }
      
      return ctx.apiSuccess({}, '更新成功');
      
    } catch (error) {
      ctx.logger.error('更新投诉状态失败:', error);
      return ctx.apiFail({}, '更新失败');
    }
  }
  
  // 获取所有投诉（管理员用）
  async listAll() {
    const { ctx } = this;
    try {
      const { page = 1, pageSize = 20 } = ctx.query;
      
      // 检查用户权限
      if (ctx.chat_user.role !== 'admin') {
        return ctx.apiFail({}, '无权限查看');
      }
      
      const result = await ctx.service.complaint.getAllComplaints(parseInt(page), parseInt(pageSize));
      
      // 格式化返回数据
      const formattedComplaints = result.rows.map(item => {
        const complaint = item.toJSON();
        return {
          ...complaint,
          user: complaint.user ? {
            id: complaint.user.id,
            uuid: complaint.user.uuid,
            username: complaint.user.username,
            nickname: complaint.user.nickname,
            avatar: complaint.user.avatar
          } : null
        };
      });
      
      return ctx.apiSuccess({
        list: formattedComplaints,
        total: result.count,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      }, '获取成功');
      
    } catch (error) {
      ctx.logger.error('获取所有投诉失败:', error);
      return ctx.apiFail({}, '获取失败');
    }
  }
  
  // 写入JSON文件
  async writeToJsonFile(complaintData, userId, targetType) {
    try {
      const dataDir = path.join(this.app.baseDir, 'data', 'complaint');
      
      // 确保目录存在
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const filename = `chat${targetType}_${userId}.json`;
      const filepath = path.join(dataDir, filename);
      
      let existingData = [];
      
      // 如果文件已存在，读取现有数据
      if (fs.existsSync(filepath)) {
        const fileContent = fs.readFileSync(filepath, 'utf8');
        existingData = JSON.parse(fileContent);
      }
      
      // 添加新投诉记录
      existingData.push({
        ...complaintData,
        id: complaintData.id || Date.now() // 使用数据库ID或临时ID
      });
      
      // 写入文件
      fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2), 'utf8');
      
    } catch (error) {
      this.ctx.logger.error('写入JSON文件失败:', error);
    }
  }
}

module.exports = ComplaintController;
```


## 四、服务
`/app/service/complaint.js`

```js
'use strict';

const Service = require('egg').Service;

class ComplaintService extends Service {
  // 创建投诉
  async create(complaintData) {
    return await this.ctx.model.ChatComplaint.create(complaintData);
  }
  
  // 根据用户ID获取投诉列表（包含用户信息）
  async getByUserId(userId) {
    return await this.ctx.model.ChatComplaint.findAll({
      where: {
        user_id: userId,
        is_deleted: 0
      },
      attributes: [
        'id', 'target_id', 'target_type', 'target_name', 'reason', 
        'content', 'images', 'status', 'admin_reply', 'create_time', 'update_time'
      ],
      include: [
        {
          model: this.app.model.User,
          as: 'user',
          attributes: ['id', 'uuid', 'username', 'nickname', 'avatar']
        }
      ],
      order: [[ 'create_time', 'DESC' ]]
    });
  }
  
  // 根据ID获取投诉详情（包含用户信息）
  async getById(id, userId) {
    return await this.ctx.model.ChatComplaint.findOne({
      where: {
        id,
        user_id: userId,
        is_deleted: 0
      },
      attributes: [
        'id', 'target_id', 'target_type', 'target_name', 'reason', 
        'content', 'images', 'status', 'admin_reply', 'create_time', 'update_time'
      ],
      include: [
        {
          model: this.app.model.User,
          as: 'user',
          attributes: ['id', 'uuid', 'username', 'nickname', 'avatar']
        }
      ]
    });
  }
  
  // 获取所有投诉（管理员用）
  async getAllComplaints(page = 1, pageSize = 20) {
    const offset = (page - 1) * pageSize;
    
    return await this.ctx.model.ChatComplaint.findAndCountAll({
      where: {
        is_deleted: 0
      },
      attributes: [
        'id', 'target_id', 'target_type', 'target_name', 'reason', 
        'content', 'images', 'status', 'admin_reply', 'create_time', 'update_time'
      ],
      include: [
        {
          model: this.app.model.User,
          as: 'user',
          attributes: ['id', 'uuid', 'username', 'nickname', 'avatar']
        }
      ],
      order: [[ 'create_time', 'DESC' ]],
      offset,
      limit: pageSize
    });
  }
  
  // 更新投诉
  async update(id, updateData, userId) {
    const where = { id };
    if (userId) {
      where.user_id = userId;
    }
    
    const result = await this.ctx.model.ChatComplaint.update(updateData, {
      where
    });
    return result[0] > 0;
  }
  
  // 删除投诉（软删除）
  async delete(id, userId) {
    const where = { id };
    if (userId) {
      where.user_id = userId;
    }
    
    const result = await this.ctx.model.ChatComplaint.update({
      is_deleted: 1,
      update_time: new Date()
    }, {
      where
    });
    return result[0] > 0;
  }
  
  // 更新投诉状态（管理员用）
  async updateStatus(id, status, adminReply = '') {
    const updateData = {
      status,
      update_time: new Date()
    };
    
    if (adminReply) {
      updateData.admin_reply = adminReply;
    }
    
    const result = await this.ctx.model.ChatComplaint.update(updateData, {
      where: { id }
    });
    return result[0] > 0;
  }
}

module.exports = ComplaintService;
```


## 五、路由
`/app/router/api/chat/router.js`

```js
    // 投诉相关路由
    router.post('/api/chat/complaint/create', controller.api.chat.complaint.create);
    router.get('/api/chat/complaint/list', controller.api.chat.complaint.list);
    router.get('/api/chat/complaint/detail/:id', controller.api.chat.complaint.detail);
    router.post('/api/chat/complaint/update/:id', controller.api.chat.complaint.update);
    router.post('/api/chat/complaint/delete/:id', controller.api.chat.complaint.delete);
    
    // 管理员路由
    // router.post('/admin/chat/complaint/status/:id', controller.api.chat.complaint.updateStatus);
    // router.get('/admin/chat/complaint/listAll', controller.api.chat.complaint.listAll);
```














































