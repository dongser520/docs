---
navbar: true
sidebar: auto
title: AI课堂
---


## 一. claude-code
### 1 安装
```js
node -v
npm -v
git -v

// Claude Code 需要更新的版本（v18.17.0 或更高）来支持某些特性

// 安装
npm install -g @anthropic-ai/claude-code

// 版本查看
claude  -version

// 执行
claude

//  卸载当前安装
npm uninstall -g @anthropic-ai/claude-code

//  清理 npm 缓存
npm cache clean --force

//  重新安装
npm install -g @anthropic-ai/claude-code

// nvm 设置node版本
nvm -h                  //查看所有nvm命令

nvm ls 或者 nvm list      //查看安装的所有node.js的版本

nvm list available        //查看显示可以安装的所有node.js的版本

nvm install 20.10.0       //安装20.10.0版本的node.js包 (你们可以安装：18.12.1 和 12.16.1)

nvm use 20.10.0           //指定使用node的版本是： 20.10.0 （如果报错是权限不够，切换成管理员模式重新cmd）
node -v  //看一下是否切换过来了

nvm list installed       //查看已经安装的node.js版本

nvm current              //显示当前使用的node.js版本

nvm uninstall 12.16.1    //卸载node.js版本号为：12.16.1的包
nvm ls //在查看一下安装的版本，看是否卸载了
```


### 2 配置
`C:\Users\Administrator` 中找到 `.claude.json` 文件
```js
{
  "firstStartTime": "2026-03-01T11:59:15.216Z",
  "opusProMigrationComplete": true,
  "sonnet1m45MigrationComplete": true,
  "userID": "7960681ae0c54b220bb89a39222b5d4fc88f894427a2eefaed1b09cded647552",
  "cachedChromeExtensionInstalled": false,
  // 添加以下内容
  "hasCompletedOnboarding": true
}
```
添加以后，最好是在项目目录中打开，重新在PowerShell执行：`claude` 命令，查看是否报错。

### 3. 安装 CC switch
1. 来到github，搜索：`CC switch` 地址： <https://github.com/farion1231/cc-switch/releases/tag/v3.11.1>
根据系统进行选择，window系统选择 `CC-Switch-v3.11.1-Windows.msi`
2. 安装`CC switch`， 可安装到D盘。

### 4. 打开 CC switch 进行模型配置
比如，以接入 `deepseek` 模型为例，<https://www.deepseek.com/> 打开之后，点击 `API 开放平台`
申请apikey，并填写到 `CC switch` 中 (apikey 需要充值)。

### 5. 在vscode中使用claude-code 并接入deepseek模型
扩展：`Claude Code` 找到 `Claude Code for VS Code`
由于已经通过`CC switch` 接入了deepseek模型，所以不需要再配置，直接使用即可。





















