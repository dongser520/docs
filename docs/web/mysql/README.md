---
navbar: true
sidebar: auto
title: 课程案例相关表设计及说明
---

## 一. 留言表 message
### message 表字段设计
| 字段名                 |  数据类型   | 描述                              |   空     | <p style="width:50px;">默认值</p>       | <p style="width:100px;">字段含义 </p>     |
| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
| <b>id </b>            | int(20)     | 主键、自增长、UNSIGNED无符号       |   否     |         无                              |                                        |
| <b>username </b>      | varchar(30) |                                  |    否    |                                         |   留言用户称呼                          |
| <b>tel </b>           | varchar(64) |                                  |    否    |                                         |   留言用户电话加密值                    |
| <b>telnumber </b>     | bigint(11) |                                   |    否    |        0                                |   留言用户电话                          |
| <b>  message </b>     | text       |                                   |    是    |        NULL                             |   用户留言内容                          |
| <b> timestamp </b>    | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   用户留言时间戳                        |
| <b> create_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据创建时间                         |
| <b> update_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据更新时间                         |

### message 模型
```js
'use strict';

module.exports = app =>{
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = app.Sequelize;

    const Message = app.model.define('message',{
        id: { 
            type: INTEGER(20).UNSIGNED, 
            primaryKey: true, 
            autoIncrement: true,
            comment: '留言板主键id'
          },
          username: { 
            type: STRING(30), 
            allowNull: false, 
            defaultValue: '', 
            comment: '留言板用户称呼',
            // set(val){
            //   let data = val + '(先生/女士)';
            //   this.setDataValue('username', data);
            // }
          },
          tel: { 
            type: STRING(64), 
            allowNull: false, 
            defaultValue: '' , 
            comment: '留言用户的电话号码加密'
          },
          telnumber : { 
            type: BIGINT(11), 
            allowNull: false, 
            defaultValue: 0 , 
            comment: '留言用户的电话号码', 
            unique: true
          },
          message : { 
            type: TEXT, 
            allowNull: true, 
            defaultValue: '', 
            comment: '留言用户的留言信息' 
          },
          // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
          timestamp : {
            type: DATE, 
            allowNull: false, 
            defaultValue:app.Sequelize.fn('NOW'),
            get(){
              let data = this.getDataValue('timestamp') ;
              /*
              //如果想转换成年月日时分秒，可以使用moment.js库等其他时间库
              //我们这里带领大家回忆一下js基础，就手动拼接一下
              let year = data.getFullYear();
              let month = ("0" + (data.getMonth() + 1)).slice(-2);
              let day = ("0" + data.getDate()).slice(-2);
              let hours = ("0" + data.getHours()).slice(-2);
              let minutes = ("0" + data.getMinutes()).slice(-2);
              let seconds = ("0" + data.getSeconds()).slice(-2);
              return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              */
              //如果想转成时间戳
              return (new Date(data)).getTime();
            }
          },
          create_time: {type: DATE, allowNull: false, defaultValue:app.Sequelize.fn('NOW')},
          update_time: {type: DATE, allowNull: false, defaultValue:app.Sequelize.fn('NOW')}
        //   timestamp : DATE,
        //   create_time: DATE,
        //   update_time: DATE
    },{
        // timestamps: true,//是否自动写入时间戳
        // tableName: 'message',//自定义数据表名称
    });

    return Message;
}
```