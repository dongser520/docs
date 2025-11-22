---
navbar: true
sidebar: auto
title: Egg.js中extend中helper调用
---

## 一、工具方法`app/extend/helper.js`文件示例
```js
'use strict';

const crypto = require('node:crypto');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  /**
   * 生成订单号
   * 格式: ORD + 年月日时分秒 + 3位随机数
   * 示例: ORD20251122014305123
   */
  generateOrderNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    
    return `ORD${year}${month}${day}${hours}${minutes}${seconds}${random}`;
  },

  /**
   * 生成UUID
   */
  generateUUID() {
    return uuidv4();
  },

  /**
   * 格式化时间
   */
  formatTime(date) {
    if (!date) return '';
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  /**
   * 格式化日期（不含时间）
   */
  formatDate(date) {
    if (!date) return '';
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  },

  /**
   * 加密密码（与shopuser模型中的加密方式一致）
   */
  encryptPassword(password, secret = 'your-secret-key') {
    const hash = crypto.createHash('sha256', secret);
    hash.update(password);
    return hash.digest('hex');
  },

  /**
   * 生成随机字符串
   */
  generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * 验证俄罗斯手机号格式
   */
  validateRussianMobile(mobile) {
    const cleanedMobile = mobile.replace(/[\s\-]/g, '');
    const russianMobileRegex = /^\+79[0-9]{9}$/;
    return russianMobileRegex.test(cleanedMobile);
  },

  /**
   * 验证邮箱格式
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * 计算价格（处理浮点数精度）
   */
  calculatePrice(price) {
    return Math.round(price * 100) / 100;
  },

  /**
   * 格式化货币显示（俄罗斯卢布）
   */
  formatCurrency(amount, currency = 'RUB') {
    const formattedAmount = parseFloat(amount).toFixed(2);
    return `${formattedAmount} ${currency}`;
  },

  /**
   * 生成订单状态文本（俄语）
   */
  getOrderStatusText(statusCode, lang = 'ru') {
    const statusMap = {
      'pending_payment': { ru: 'Ожидание оплаты', en: 'Pending Payment' },
      'paid': { ru: 'Оплачено', en: 'Paid' },
      'processing': { ru: 'В обработке', en: 'Processing' },
      'shipped': { ru: 'Отправлено', en: 'Shipped' },
      'delivered': { ru: 'Доставлено', en: 'Delivered' },
      'cancelled': { ru: 'Отменено', en: 'Cancelled' },
      'refunded': { ru: 'Возврат', en: 'Refunded' }
    };

    return statusMap[statusCode] ? statusMap[statusCode][lang] : statusCode;
  },

  /**
   * 获取支付状态文本（俄语）
   */
  getPaymentStatusText(status, lang = 'ru') {
    const statusMap = {
      'pending': { ru: 'Ожидание оплаты', en: 'Pending' },
      'paid': { ru: 'Оплачено', en: 'Paid' },
      'failed': { ru: 'Ошибка оплаты', en: 'Failed' },
      'refunded': { ru: 'Возврат', en: 'Refunded' }
    };

    return statusMap[status] ? statusMap[status][lang] : status;
  },

  /**
   * 深度克隆对象
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (obj instanceof Object) {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  },

  /**
   * 安全获取对象属性
   */
  get(obj, path, defaultValue = null) {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return defaultValue;
      }
    }
    
    return result !== undefined ? result : defaultValue;
  },

  /**
   * 防抖函数
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * 节流函数
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};
```

## 二、在模型中使用 helper 方法示例
如：在 `app/model/shoporder.js` 中：
```js
'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, DECIMAL, TEXT, ENUM, TINYINT } = app.Sequelize;

  const ShopOrder = app.model.define('shoporder', {
    id: {
      type: INTEGER(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '订单主键ID'
    },
    order_number: {
      type: STRING(50),
      allowNull: false,
      unique: true,
      comment: '订单号',
      defaultValue: () => {
        // 使用 helper 生成订单号
        return app.helper.generateOrderNumber();
      }
    },
    // ... 其他字段保持不变
    create_time: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.fn('NOW'),
      get() {
        const value = this.getDataValue('create_time');
        return app.helper.formatTime(value);
      }
    },
    // ... 其他时间字段的 getter 也使用 helper.formatTime
  });

  // ... 其他代码保持不变
};
```

## 三、在控制器中调用 helper 方法
如：在 `app/controller/api/template05/usercenter.js` 或其他控制器中：
```js
// 生成订单号示例
const orderNumber = this.ctx.helper.generateOrderNumber();
console.log('生成的订单号:', orderNumber);

// 格式化时间示例
const formattedTime = this.ctx.helper.formatTime(new Date());
console.log('格式化时间:', formattedTime);

// 验证手机号示例
const isValidMobile = this.ctx.helper.validateRussianMobile('+79123456789');
console.log('手机号验证:', isValidMobile);

// 格式化货币示例
const formattedPrice = this.ctx.helper.formatCurrency(1500.50);
console.log('格式化价格:', formattedPrice); // 输出: 1500.50 RUB

// 获取订单状态文本示例
const statusText = this.ctx.helper.getOrderStatusText('pending_payment', 'ru');
console.log('订单状态:', statusText); // 输出: Ожидание оплаты
```


## 四、在服务中调用 helper 方法
如：在 `app/service/shoporder.js` 中：
```js
'use strict';

const Service = require('egg').Service;

class ShopOrderService extends Service {
  /**
   * 创建订单
   */
  async create(orderData) {
    const { ctx } = this;
    
    try {
      // 使用 helper 生成订单号
      const orderNumber = ctx.helper.generateOrderNumber();
      
      const order = await ctx.model.ShopOrder.create({
        order_number: orderNumber,
        ...orderData
      });
      
      console.log('✅ 订单创建成功，订单号:', orderNumber);
      return order;
      
    } catch (error) {
      console.error('❌ 创建订单失败:', error);
      throw error;
    }
  }

  /**
   * 计算订单金额
   */
  calculateOrderAmount(items, shippingFee = 0, discount = 0) {
    const { helper } = this.ctx;
    
    // 计算商品总价
    const subtotal = items.reduce((total, item) => {
      return total + (item.unit_price * item.quantity);
    }, 0);
    
    // 使用 helper 处理浮点数精度
    const totalAmount = helper.calculatePrice(subtotal);
    const discountAmount = helper.calculatePrice(discount);
    const shippingAmount = helper.calculatePrice(shippingFee);
    const finalAmount = helper.calculatePrice(totalAmount - discountAmount + shippingAmount);
    
    return {
      total_amount: totalAmount,
      discount_amount: discountAmount,
      shipping_amount: shippingAmount,
      final_amount: finalAmount
    };
  }

  /**
   * 获取订单详情（包含格式化信息）
   */
  async getOrderDetail(orderId) {
    const { ctx } = this;
    
    const order = await ctx.model.ShopOrder.findOne({
      where: { id: orderId, is_deleted: 0 },
      include: [
        {
          model: ctx.model.ShopOrderStatus,
          as: 'status',
          attributes: ['id', 'name_ru', 'name_en', 'code', 'color']
        },
        {
          model: ctx.model.ShopOrderItem,
          as: 'items',
          where: { is_deleted: 0 },
          required: false
        }
      ]
    });
    
    if (!order) {
      return null;
    }
    
    // 使用 helper 格式化订单信息
    const formattedOrder = {
      ...order.toJSON(),
      status_text: ctx.helper.getOrderStatusText(order.status.code, 'ru'),
      payment_status_text: ctx.helper.getPaymentStatusText(order.payment_status, 'ru'),
      formatted_final_amount: ctx.helper.formatCurrency(order.final_amount)
    };
    
    return formattedOrder;
  }
}

module.exports = ShopOrderService;
```


## 五、在模板中使用 helper 方法
如：在模板文件中（如 .html 文件），可以通过 ctx.helper 调用：
```html
<script>
// 在客户端JavaScript中无法直接调用服务端的helper
// 但可以在服务端渲染时传递格式化后的数据
</script>

<!-- 或者在服务端渲染时使用 -->
<div class="order-info">
  <p>订单号: {{ order.order_number }}</p>
  <p>订单状态: {{ ctx.helper.getOrderStatusText(order.status.code, 'ru') }}</p>
  <p>支付状态: {{ ctx.helper.getPaymentStatusText(order.payment_status, 'ru') }}</p>
  <p>订单金额: {{ ctx.helper.formatCurrency(order.final_amount) }}</p>
  <p>下单时间: {{ ctx.helper.formatTime(order.create_time) }}</p>
</div>
```

## 六、调用方式总结
- 在控制器中: this.ctx.helper.methodName()

- 在服务中: this.ctx.helper.methodName() 或 const { helper } = this.ctx; helper.methodName()

- 在模型中: app.helper.methodName()

- 在模板中: ctx.helper.methodName()













































