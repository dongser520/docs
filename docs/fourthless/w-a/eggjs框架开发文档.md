---
navbar: true
sidebar: auto
title: eggjs框架开发文档
---


## 一、管理员板块
### 1. 管理员表 `shop_manager`
> 其实数据库中有一个管理员表，这里为了方便两个技术栈同学学习，我们统一再创建一个管理员表 `shop_manager`<br/>
> 具体表设计，<a href="/web/mysql/shop_manager" target="_blank">点击查看</a><br/>

### 2. 管理员角色表 `role`
> 正常来说，应该叫`角色表：role`，这里为了方便大家更容易理解这个表，因此称它为 `管理员角色表`。事实上，这张表不仅可以包含管理员的各种角色，还可以设定用户的角色。<br/><br/>
> 说明：<br/>正常来说，我们的`管理员表`：`shop_manager`有一个字段叫：`role_id`,它这个字段实际上是`角色表：role`的id值，而到目前为止，我们数据库还不存在`角色表：role`，因此我们还需要创建一张`角色表：role`。<br/><br/>
> <span style="color:#ff6600;">重点说明：</span><br/>
> 正常来说，我们管理员表里面存在`role_id`这个字段，对应的是角色表`role`的id值，那么，首先应该创建角色表`角色表：role`，然后再创建管理员表`shop_manager`，但是由于本套课程涉及到两套框架`thinkphp`/`egg.js`，为了方便讲解及融合两天框架，因此我们先以管理员表为例，讲解了管理员表的`新增`、`修改`、`删除`，方便大家先了解`thinkphp`框架，接下来，由于需要讲到管理员列表，这里涉及到多表（角色表、管理员表）的模型关联、不管是`thinkphp`/`egg.js` 都存在模型关联，因此再讲管理员列表功能之前，我们需要创建一下`角色表：role`。<br/>
> <br/>
> 具体`角色表：role`设计，<a href="/web/mysql/role" target="_blank">点击查看</a><br/>

### 3. [新增]分类表`category`的角色表 `rolecategory`
重要说明：<br/>
> 本节课讲的分类表`category`的角色表 `rolecategory`，本不属于`管理员板块`的内容，主要是受我们上一节的影响，因此临时插入了这节课，因为我们分类表`category`的角色表 `rolecategory`，它的字段跟我们上节课讲的管理员角色表 `role`，字段是一样的，这样大家理解起来非常容易，只不过这张表`rolecategory`是充当的分类的角色。<br/><br/>
> 本节课是一节综合课，两种技术栈`thinkphp`和我们`egg.js`同学都学习操作一下。<br/><br/>
> 这张分类表`category`的角色表 `rolecategory`，主要是将来用于区别后台系统里面，不同的分类系统用的，比如，我们可以有一个大的综合性后台，这个后台可以管理：`普通企业网站的后台`、`商城后台`、`直播后台`等等，而这些后台分类，就可以用我们这张表`rolecategory`，目前大家先把这张表创建起来，后面我们学到了在详细讲这张表。<br/><br/>
> 具体`分类表角色表：rolecategory`设计，<a href="/web/mysql/rolecategory" target="_blank">点击查看</a><br/>

### 4. 角色权限表 `rule`
> 我们在前面已经创建了`角色表：role`，为了方便角色的管理，我们可以为角色创建权限，让定义的角色访问对应的权限。<br/>
> 具体角色权限表`rule`设计，具体查看：<a href="/web/mysql/role.html#三、role表的权限表rule-字段设计" target="_blank">点击查看 角色的权限表 `rule`</a><br/>

### 5. 角色权限中间表 `role_rule`
说明：
> 我们前面讲`shop_manager`表的时候，是通过在表中设置外键字段 `role_id`来关联`role`表，那么这里我们换另外一种方式来做表的关联，就是这种中间表，比如 `role_rule`, 来关联角色表`role`和权限表`rule`, 让大家能够学习到更多关联关系的处理。 <br/><br/>
> 具体角色权限中间表 `role_rule`设计，具体查看：<a href="/web/mysql/role.html#五、角色表role和权限表rule的中间表-role-rule-表字段设计" target="_blank">点击查看 角色权限中间表 `role_rule`</a><br/>

### 6. 创建超级管理员
说明：
> 接来下我们在我们之前开发的后台的基础上进行商城板块后台的开发，为了和thinkphp框架同学学习进度保持一致性，需要做以下准备：<br/>
> 1. 老师这边需要先清空前面创建的几张表的内容，这些内容是老师讲thinkphp框架的时候，数据测试的内容<br/>
> 2. 同学们记得把我们创建的几张表，如果你用的迁移命令创建的，记得加一下表关联关系的内容<br/>
> 3. 清空manager表的管理员数据，我们从登录开始，在我们创建超级管理员的时候，我们会对`manager`表（后台管理员表）和`shop_manager`表（商城管理员表）同时创建，大家知道，超级管理员属于特殊角色，任何系统和后台应该只有一个，我们这里两张管理员表，一个用于管理我们的后台，一个用于管理商城系统的后台，另外一个原因也是为了和学习thinkphp框架的同学，学习的内容接口保持一致，因为他们用的token判断权限，我们目前的后台用的是session，因此在商城这块，我们也会用token，接下来同学们跟着老师一起操作就可以了。<br/><br/>
具体查看：<a href="/fourthless/w-a/eggjs.管理员板块" target="_blank">点击查看具体内容</a><br/>
> ### ① 生成token
> 具体查看：<a href="/fourthless/w-a/eggjs.管理员板块.html#二、后台管理员登录生成商城超级管理员token" target="_blank">生成商城超级管理员token</a><br/>
> ### ② 加入缓存redis中
> 具体查看：<a href="/fourthless/w-a/eggjs.管理员板块.html#三、商城系统管理员登录信息加入缓存redis中" target="_blank">加入缓存redis中</a><br/>
> ### ③ 管理员信息token验证
> 具体查看：<a href="/fourthless/w-a/eggjs.管理员板块.html#五、token权限验证中间件开发" target="_blank">管理员信息token验证</a><br/>

### 7. 角色管理
具体查看：<a href="/fourthless/w-a/eggjs.管理员板块.html#六、角色管理" target="_blank">角色管理</a><br/>

### 8. 商城管理员
具体查看：<a href="/fourthless/w-a/eggjs.商城管理员" target="_blank">商城管理员</a><br/>

### 9. 权限管理
具体查看：<a href="/fourthless/w-a/eggjs.权限管理" target="_blank">权限管理</a><br/>

### 10. 给角色配置权限及删除权限
具体查看：<a href="/fourthless/w-a/eggjs.给角色配置权限" target="_blank">给角色配置权限及删除权限</a><br/><br/>
`特别说明`： 角色列表关联查询权限信息（通过中间表）<br/>
> 角色列表关联查询权限信息（通过中间表）`模型关联`的用法：<a href="/fourthless/w-a/eggjs.管理员板块.html#九、角色列表-包含角色对应的权限api接口" target="_blank">【九、角色列表（包含角色对应的权限API接口）】</a><br/>

### 11. 管理员板块所有接口
> #### 1. shop_manager表接口 <br/>
> 具体查看：<a href="/web/mysql/shop_manager表接口.html" target="_blank">shop_manager表接口</a><br/>
> #### 2. role表接口 <br/>
> 具体查看：<a href="/web/mysql/role表接口.html" target="_blank">role表接口</a><br/>
> #### 3. rule表接口 <br/>
> 具体查看：<a href="/web/mysql/rule表接口.html" target="_blank">rule表接口</a><br/>
