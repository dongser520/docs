---
navbar: true
sidebar: auto
title:  Sequelize数据类型
---

以下是 Sequelize 中所有可解构的数据类型列表，包含详细说明和示例：
## 1. 基础数值类型
| 类型             |  说明       |   示例     | 
| :---:            | :---:      |  :---:     |
| <b>INTEGER </b>  | 整数类型    |    age: { type: INTEGER }      |  
| <b>TINYINT </b>  | 小整数（范围：-128~127，常用于布尔值）    |    isActive: { type: TINYINT }      |  
| <b>SMALLINT </b>  | 短整数（范围：-32768~32767）    |    quantity: { type: SMALLINT }      |  
| <b>MEDIUMINT </b>  | 中等整数（范围：-8388608~8388607，MySQL 专用）    |    views: { type: MEDIUMINT }     |  
| <b>BIGINT </b>  | 大整数（范围：-2^63 ~ 2^63-1）    |    id: { type: BIGINT, primaryKey: true }      |  
| <b>FLOAT </b>  | 浮点数（可指定精度）    |    `price: { type: FLOAT(10, 2) }` // 总位数10，小数点后2位      |  
| <b>DOUBLE </b>  | 双精度浮点数    |    distance: { type: DOUBLE }      |  
| <b>DECIMAL </b>  | 精确小数（适合金额）    |    `amount: { type: DECIMAL(10, 2) }` // 10位总长度，2位小数      |  
| <b>REAL </b>  | 单精度浮点数（类似 FLOAT，PostgreSQL 专用）    |    score: { type: REAL }      | 

## 2. 字符串与文本
| 类型             |  说明       |   示例     | 
| :---:            | :---:      |  :---:     |
| <b>STRING </b>  | 可变长度字符串（默认长度 255）    |    `name: { type: STRING(100) }` // 最大长度100      |
| <b>CHAR </b>  | 定长字符串    |    code: { type: CHAR(10) }    | 
| <b>TEXT </b>  | 长文本（无长度限制）    |    content: { type: TEXT }      | 
| <b>UUID </b>  | UUID 字符串（常用于分布式唯一标识）    |    id: { type: UUID, defaultValue: Sequelize.UUIDV4 }      | 
| <b>ENUM </b>  | 枚举值（限定字段值范围）    |    status: { type: ENUM('pending', 'success', 'failed') } |  

## 3. 时间与日期
| 类型             |  说明       |   示例     | 
| :---:            | :---:      |  :---:     |
| <b>DATE </b>  | 日期+时间（含时区，默认存储为 UTC）    |    createdAt: { type: DATE, defaultValue: Sequelize.NOW }      |
| <b>DATEONLY </b>  | 仅日期（格式 YYYY-MM-DD）    |    birthday: { type: DATEONLY }      |
| <b>TIME </b>  | 仅时间（格式 HH:mm:ss）   |    startTime: { type: TIME }      |
| <b>NOW </b>  | 插入时自动设置为当前时间（需配合 defaultValue）   |    createdAt: { type: DATE, defaultValue: Sequelize.NOW }      |

## 4. 二进制与高级类型
| 类型             |  说明       |   示例     | 
| :---:            | :---:      |  :---:     |
| <b>BLOB </b>  | 二进制数据（如图片、文件）    |    image: { type: BLOB }      |
| <b>JSON </b>  | JSON 数据（通用数据库）    |    metadata: { type: JSON }      |
| <b>JSONB </b>  | 二进制 JSON（PostgreSQL 专用，支持索引和查询）    |    profile: { type: JSONB }     |
| <b>ARRAY </b>  | 数组（PostgreSQL 专用）    |    `tags: { type: ARRAY(STRING) }` // 字符串数组      |
| <b>GEOMETRY </b>  | 地理空间数据（需数据库支持，如 PostgreSQL + PostGIS）    |    `location: { type: GEOMETRY('POINT') }` // 存储经纬度坐标     |
| <b>VIRTUAL </b>  | 虚拟字段（不存储到数据库，用于计算）    |    fullName: { type: VIRTUAL, get() { return this.first + ' ' + this.last } }|

## 5. 其他类型
| 类型             |  说明       |   示例     | 
| :---:            | :---:      |  :---:     |
| <b>BOOLEAN </b>  | 布尔值（存储为 true/false 或 1/0）    |    isPublished: { type: BOOLEAN, defaultValue: false }      |
| <b>CITEXT </b>  | 不区分大小写的文本（PostgreSQL 专用）    |    username: { type: CITEXT }     |

## 6.完整示例代码
```javascript
const {
  INTEGER,
  STRING,
  DATE,
  ENUM,
  TEXT,
  BIGINT,
  BOOLEAN,
  FLOAT,
  DECIMAL,
  DATEONLY,
  UUID,
  JSON,
  JSONB,
  BLOB,
  GEOMETRY,
  ARRAY,
  VIRTUAL
} = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      username: {
        type: STRING(50),
        unique: true
      },
      age: {
        type: INTEGER,
        validate: { min: 0 }
      },
      balance: {
        type: DECIMAL(10, 2),
        defaultValue: 0.0
      },
      isAdmin: {
        type: BOOLEAN,
        defaultValue: false
      },
      birthDate: {
        type: DATEONLY
      },
      lastLogin: {
        type: DATE
      },
      metadata: {
        type: JSON
      },
      profileImage: {
        type: BLOB
      },
      tags: {
        type: ARRAY(STRING)
      },
      fullName: {
        type: VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        }
      }
    });
  }
};
```

## 7. 关键注意事项
####  数据库兼容性：
1. JSONB、ARRAY、CITEXT 仅 PostgreSQL 支持。 <br/>
2. GEOMETRY 需要 PostGIS 扩展。
####  默认值：
1. 时间类型常用 Sequelize.NOW 自动填充。<br/>
2. UUID 使用 defaultValue: Sequelize.UUIDV4 生成随机值。
####  虚拟字段：
1. 不参与数据库读写，但可通过模型访问。 <br/>
#### 长度限制：
1. STRING(n)、CHAR(n) 可指定长度，TEXT 无长度限制。 <br/>
#### 建议结合业务需求选择类型，例如：
1. 精确数值 → DECIMAL <br/>
2. 唯一标识 → UUID <br/>
3. 动态结构数据 → JSON/JSONB <br/>
4. 地理数据 → GEOMETRY <br/>
