---
navbar: true
sidebar: auto
title: eggjs修改商品其他信息
---

## 一、修改商品其他信息
### 1. 商品列表展示其他信息
`app/controller/admin/goods.js`
```js
    // 商品列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let keyword = ctx.query.keyword || '';
        let data = await ctx.page('Goods',{
            name:{
                [this.app.Sequelize.Op.like]: '%' + keyword + '%',
            }
        },{
            include:[{
                model:app.model.GoodsClass,
                attributes:['id','name'],
            }],
        });
        // let data = await ctx.service.goodsClass.datalist({ limit: 10000 });
        // console.log('数据', data);
        // ctx.body = data;
        // return;
        // data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '商品列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/goods-/create',//新增路径
                        desc: '创建商品',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    },
                    // {
                    //     url: '/shop/admin/goods/create',//新增路径
                    //     desc: '上传商品',//新增 //按钮名称
                    //     // icon: 'fa fa-plus fa-lg',//按钮图标
                    // }
                ],
                //表头
                columns: [
                    {
                        title: '商品分类和商品名称等',
                        // key: 'name',
                        class: 'text-left',//可选
                        width:150,
                        render(item) { 
                            // console.log('每个item',item);
                            return `<div style="font-size:12px;">
                                 <p style="color:#999000;"><span>商品分类：</span><span>${item.goods_class.name}</span></p>
                                 <div style="display:flex;">
                                     <img src="${item.cover}" style="width:50px;height:50px;margin-right:10px;">
                                     <p style="width:90px;display:flex;
                                     flex-wrap:wrap;white-space:wrap;"><span>${item.name}</span></p>
                                 </div>
                            </div>`;
                        }
                    },
                    {
                        title: '价格相关',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { 
                            // console.log('每个item',item);
                            return `<div style="font-size:12px;">
                                 <p style="color:#999000;"><span>起售价（最低售价，多少元起）：</span>
                                 <span>${item.min_price?item.min_price:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>历史最低价：</span>
                                 <span>${item.history_min_price?item.history_min_price:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>券后价：</span>
                                 <span>${item.coupon_price?item.coupon_price:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>折后价：</span>
                                 <span>${item.discount_price?item.discount_price:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>秒杀价：</span>
                                 <span>${item.spike_price?item.spike_price:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>其它设置价（如:首件价，新客价，30天低价等等）：</span>
                                 <span>${item.other_price?item.other_price:'暂无'}</span></p>
                                 <p><a href="/shop/admin/goods-/${item.id}/editPrice"
                                 style="color:green;">修改商品价格相关信息</a></p>
                            </div>`;
                        }
                    },
                    {
                        title: '库存相关',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { 
                            // console.log('每个item',item);
                            return `<div style="font-size:12px;">
                                 <p style="color:#999000;"><span>单位（默认：件）：</span>
                                 <span>${item.unit?item.unit:'件'}</span></p>
                                 <p style="color:#999000;"><span>库存：</span>
                                 <span>${item.stock?item.stock:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>库存预警：</span>
                                 <span>${item.min_stock?item.min_stock:'暂无'}</span></p>
                                 <p><a href="/shop/admin/goods-/${item.id}/editStock"
                                 style="color:green;">修改商品库存相关信息</a></p>
                            </div>`;
                        }
                    },
                    {
                        title: '库存是否显示',
                        key: 'stock_display',
                        // width: 200,//可选
                        class: 'text-left',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            // console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '显示' },
                                { value: 0, name: '隐藏' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.stock_display}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('stock_display','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods-','Goods')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    {
                        title: '统计相关',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { 
                            // console.log('每个item',item);
                            return `<div style="font-size:12px;">
                                 <p style="color:#999000;"><span>商品评分：</span>
                                 <span>${item.rating?item.rating:5.0}</span></p>
                                 <p style="color:#999000;"><span>总销量：</span>
                                 <span>${item.sale_count?item.sale_count:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>商品评论数量：</span>
                                 <span>${item.review_count?item.review_count:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>商品收藏量：</span>
                                 <span>${item.love_count?item.love_count:'暂无'}</span></p>
                                 <p style="color:#999000;"><span>商品推荐量：</span>
                                 <span>${item.recommend_count?item.recommend_count:'暂无'}</span></p>
                                 <p><a href="/shop/admin/goods-/${item.id}/editTotalinfo"
                                 style="color:green;">修改商品统计相关信息</a></p>
                            </div>`;
                        }
                    },
                    {
                        title: '商品标签',
                        // key: 'goods_tags',
                        class: 'text-left',//可选
                        render(item) { 
                            // console.log('每个item',item);
                            let str = ``;
                            if(item.goods_tags){
                                let arr = item.goods_tags.split(/[,，]/);
                                for(let i=0;i<arr.length;i++){
                                    str += `<span style="border:1px solid #909090;padding:2px;margin:2px;">${arr[i]}</span>`;
                                }
                            }
                            return `<div style="font-size:12px;width:100px;display:flex;flex-wrap:wrap;">
                                 ${str}
                                 <p style="margin-top:10px;"><a href="/shop/admin/goods-/${item.id}/editTags"
                                 style="color:green;">修改商品标签</a></p>
                            </div>`;
                        }
                    },
                    {
                        title: '审核状态',
                        key: 'ischeck',
                        // width: 200,//可选
                        class: 'text-left',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            // console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '通过' },
                                { value: 0, name: '审核中' },
                                { value: 2, name: '拒绝' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.ischeck}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('ischeck','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods-','Goods')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    {
                        title: '商品状态',
                        key: 'goods_status',
                        // width: 200,//可选
                        class: 'text-left',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            // console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '上架' },
                                { value: 0, name: '仓库' },
                                { value: 2, name: '下架' },
                                { value: 3, name: '违规下架' },
                                { value: 4, name: '回收站' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.goods_status}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('goods_status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods-','Goods')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    // {
                    //     title: '分类下的商品',
                    //     // key: 'name',
                    //     class: 'text-left',//可选
                    //     render(item) { //树形数据
                    //         // console.log('每个item',item);
                    //         // if (item.level) {
                    //         //     let w = item.level * 40;
                    //         //     return `<span style="display:inline-block;width:${w}px"></span>`;
                    //         // }
                    //         return `<a href="/shop/admin/imageclass/${item.id}/imgList">${item.images.length}张</a>`;
                    //     }
                    // },
                    // {
                    //     title: '是否是导航栏栏目',
                    //     key: 'isnav',
                    //     width: 200,//可选
                    //     class: 'text-center',//可选
                    //     hidekeyData: true,//是否隐藏key对应的数据
                    //     render(item) {
                    //         console.log('可用状态里面每个item', item);
                    //         let arr = [
                    //             { value: 1, name: '是' },
                    //             { value: 0, name: '否' },
                    //         ];
                    //         let str = `<div class="btn-group btn-group-${item.id}">`;
                    //         for (let i = 0; i < arr.length; i++) {
                    //             str += `<button type="button" class="btn btn-light" data="${item.isnav}"
                    //             value="${arr[i].value}"
                    //             @click="changeBtnStatus('isnav','btn-group-${item.id}',${arr[i].value},${i},${item.id},'category','Category')">${arr[i].name}</button>`;
                    //         }
                    //         str += `</div>`;
                    //         return str;
                    //     }
                    // },
                    {
                        title: '排序',
                        key: 'order',
                        class: 'text-center',//可选
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            // console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '可用' },
                                { value: 0, name: '不可用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods-','Goods')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    {
                        title: '操作',
                        class: 'text-right',//可选
                        action: {
                            //修改
                            edit: function (id) {
                                return `/shop/admin/goods-/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/goods-/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    }
```
### 2. 解决商品列表数据过宽，不能滑动查看数据的问题
#### 1. 主模版隐藏了滚动条，调整设置
`app/view/admin/layout/main_app.html`
改成电脑端出现滚动条，手机端隐藏滚动条
```css
<style type="text/css">
    @media (max-width: 768px) {
        ::-webkit-scrollbar {
            display: none;  
            width: 2px !important;  
            height: 2px !important;  
            -webkit-appearance: none;  
            background: transparent;  
        }
    }
</style>
```
#### 2. 如果不想滚动条查看，想通过鼠标查看列表数据，代码如下
`app/view/admin/layout/main_app.html`
```js

<style>
	/* 隐藏默认滚动条（可选） */
	.table-responsive {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch; /* 启用平滑滚动 */
		scrollbar-width: none; /* Firefox */
	}
	.table-responsive::-webkit-scrollbar {
		display: none; /* Chrome/Safari */
	}
	
	/* 添加拖动光标提示 */
	.table-responsive.dragging {
		cursor: grab;
		user-select: none;
	}
</style>
	
<script>
	document.addEventListener('DOMContentLoaded', function() {
		const slider = document.querySelector('.table-responsive');
		let isDown = false;
		let startX;
		let scrollLeft;
	
		slider.addEventListener('mousedown', (e) => {
			isDown = true;
			slider.classList.add('dragging');
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});
	
		slider.addEventListener('mouseleave', () => {
			isDown = false;
			slider.classList.remove('dragging');
		});
	
		slider.addEventListener('mouseup', () => {
			isDown = false;
			slider.classList.remove('dragging');
		});
	
		slider.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 2; // 调整滚动速度
			slider.scrollLeft = scrollLeft - walk;
		});
		// 添加触摸事件支持
		// let touchStartX;
		// let touchScrollLeft;

		// slider.addEventListener('touchstart', (e) => {
		// 	touchStartX = e.touches[0].pageX;
		// 	touchScrollLeft = slider.scrollLeft;
		// });

		// slider.addEventListener('touchmove', (e) => {
		// 	e.preventDefault();
		// 	const x = e.touches[0].pageX;
		// 	const walk = (x - touchStartX) * 2;
		// 	slider.scrollLeft = touchScrollLeft - walk;
		// });
	});
</script>


```

### 3. 总路由
`app/router/admin/shop.js`
```js
module.exports = app => {
    ...
    //修改商品标签相关界面和数据
    router.get('/shop/admin/goods-/:id/editTags', controller.admin.goods.editTags);
    router.post('/shop/admin/goods-/:id/saveTags', controller.admin.goods.saveTags);
    //修改商品统计相关界面和数据
    router.get('/shop/admin/goods-/:id/editTotalinfo', controller.admin.goods.editTotalinfo);
    router.post('/shop/admin/goods-/:id/saveTotalinfo', controller.admin.goods.saveTotalinfo);
    //修改商品库存相关界面和数据
    router.get('/shop/admin/goods-/:id/editStock', controller.admin.goods.editStock);
    router.post('/shop/admin/goods-/:id/saveStock', controller.admin.goods.saveStock);
    //修改商品价格相关
    router.get('/shop/admin/goods-/:id/editPrice', controller.admin.goods.editPrice);
    router.post('/shop/admin/goods-/:id/savePrice', controller.admin.goods.savePrice);
    //删除商品功能
    router.post('/shop/admin/goods-/:id/delete', controller.admin.goods.deleteAPI);
    router.get('/shop/admin/goods-/:id/delete', controller.admin.goods.delete);
    //修改商品状态功能
    router.post('/shop/admin/goods-/:id/update_status',controller.admin.goods.updateStatus);
    //修改商品界面
    router.get('/shop/admin/goods-/edit/:id', controller.admin.goods.edit);
    //批量删除商品
    router.post('/shop/admin/goods-/deleteAll', controller.admin.goods.deleteAll);
    //修改商品数据功能
    router.post('/shop/admin/goods-/:id', controller.admin.goods.update);
    // 创建商品界面
    router.get('/shop/admin/goods-/create', controller.admin.goods.create);
    //创建商品提交数据
    router.post('/shop/admin/goods-', controller.admin.goods.save);
    //商品列表页面
    router.get('/shop/admin/goods-/:page', controller.admin.goods.indexAPI);
    router.get('/shop/admin/goods-', controller.admin.goods.index);
    
};
```

### 4. 修改商品价格相关
`app/controller/admin/goods.js`
```js
    //修改商品价格相关界面
    async editPrice() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Goods.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该商品不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前商品分类数据', currentdata);
        // return;

        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改商品:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/shop/admin/goods-/' + id + '/savePrice',
                //  字段
                fields: [
                    // {
                    //     label: '放在哪个商品分类里面',
                    //     type: 'dropdown', //下拉框
                    //     name: 'goods_class_id',
                    //     default: JSON.stringify(data),
                    //     placeholder: '不调整（如需调整请选择）',
                    // },
                    {
                        label: '起售价（最低售价，多少元起）',
                        type: 'number',
                        name: 'min_price',
                        placeholder: '请输入起售价（最低售价，多少元起）,选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '历史最低价',
                        type: 'number',
                        name: 'history_min_price',
                        placeholder: '请输入历史最低价,选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '券后价',
                        type: 'number',
                        name: 'coupon_price',
                        placeholder: '请输入券后价,选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '折后价',
                        type: 'number',
                        name: 'discount_price',
                        placeholder: '请输入折后价,选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '秒杀价',
                        type: 'number',
                        name: 'spike_price',
                        placeholder: '请输入秒杀价,选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '其它设置价（如:首件价，新客价，30天低价等等）',
                        type: 'number',
                        name: 'other_price',
                        placeholder: '请输入其它设置价（如:首件价，新客价，30天低价等等）,选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/shop/admin/goods-',
        });
    }
    //修改商品价格相关功能
    async savePrice() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品id'
            },
            min_price: {
                type: 'float',
                required: false,
                // defValue: '',
                desc: '起售价（最低售价，多少元起）'
            },
            history_min_price: {
                type: 'float',
                required: false,
                // defValue: '',
                desc: '历史最低价'
            },
            coupon_price: {
                type: 'float',
                required: false,
                // defValue: '',
                desc: '券后价'
            },
            discount_price: {
                type: 'float',
                required: false,
                // defValue: '',
                desc: '折后价'
            },
            spike_price: {
                type: 'float',
                required: false,
                // defValue: '',
                desc: '秒杀价'
            },
            other_price: {
                type: 'float',
                required: false,
                // defValue: '',
                desc: '其它设置价（如:首件价，新客价，30天低价等等）'
            }
            
        });

        // 参数
        const id = ctx.params.id;
        const {  min_price, history_min_price, coupon_price, discount_price,spike_price, other_price } = ctx.request.body;
        // 先看一下是否存在
        // let dataclass = await app.model.GoodsClass.findOne({ where: { id:goods_class_id } });
        // if (!dataclass) {
        //     return ctx.apiFail('该商品分类记录不存在');
        // }
        let data = await app.model.Goods.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        //存在
        // const Op = this.app.Sequelize.Op;//拿Op,固定写法
        // //只要不放在同一分类级别下还是可以的
        // const hasdata = await app.model.GoodsClass.findOne({
        //     where: {
        //         name,
        //         id: {
        //             [Op.ne]: id
        //         }
        //     }
        // });
        // if (hasdata && hasdata.pid == pid) {
        //     return ctx.apiFail('同一个分类下不能有相同的商品分类名称');
        // }
        // 修改数据
        data.min_price = min_price;
        data.history_min_price = history_min_price;
        data.coupon_price = coupon_price;
        data.discount_price = discount_price;
        data.spike_price = spike_price;
        data.other_price = other_price;
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改成功');
    }
```

### 5. 修改商品库存、统计、标签相关信息
`app/controller/admin/goods.js`
```js
    //修改商品库存相关界面
    async editStock() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Goods.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该商品不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前商品分类数据', currentdata);
        // return;

        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改商品:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/shop/admin/goods-/' + id + '/saveStock',
                //  字段
                fields: [
                    // {
                    //     label: '放在哪个商品分类里面',
                    //     type: 'dropdown', //下拉框
                    //     name: 'goods_class_id',
                    //     default: JSON.stringify(data),
                    //     placeholder: '不调整（如需调整请选择）',
                    // },
                    {
                        label: '单位（默认：件）',
                        type: 'text',
                        name: 'unit',
                        placeholder: '请输入单位，选填',
                        default:'件', //新增时候默认值，可选
                    },
                    {
                        label: '库存',
                        type: 'number',
                        name: 'stock',
                        placeholder: '请输入库存，选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '库存预警',
                        type: 'number',
                        name: 'min_stock',
                        placeholder: '请输入库存预警[低于多少库存通知商家]，选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/shop/admin/goods-',
        });
    }
    //修改商品库存相关数据
    async saveStock() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品id'
            },
            unit: {
                type: 'string',
                required: false,
                defValue: '件',
                desc: '单位'
            },
            stock: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '库存'
            },
            min_stock: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '库存预警'
            },
            
        });

        // 参数
        const id = ctx.params.id;
        const {  unit, stock, min_stock} = ctx.request.body;
        // 先看一下是否存在
        // let dataclass = await app.model.GoodsClass.findOne({ where: { id:goods_class_id } });
        // if (!dataclass) {
        //     return ctx.apiFail('该商品分类记录不存在');
        // }
        let data = await app.model.Goods.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        //存在
        // const Op = this.app.Sequelize.Op;//拿Op,固定写法
        // //只要不放在同一分类级别下还是可以的
        // const hasdata = await app.model.GoodsClass.findOne({
        //     where: {
        //         name,
        //         id: {
        //             [Op.ne]: id
        //         }
        //     }
        // });
        // if (hasdata && hasdata.pid == pid) {
        //     return ctx.apiFail('同一个分类下不能有相同的商品分类名称');
        // }
        // 修改数据
        data.unit = unit;
        data.stock = stock;
        data.min_stock = min_stock;
        
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改成功');
    }

    //修改商品统计相关界面
    async editTotalinfo() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Goods.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该商品不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前商品分类数据', currentdata);
        // return;

        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改商品:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/shop/admin/goods-/' + id + '/saveTotalinfo',
                //  字段
                fields: [
                    // {
                    //     label: '放在哪个商品分类里面',
                    //     type: 'dropdown', //下拉框
                    //     name: 'goods_class_id',
                    //     default: JSON.stringify(data),
                    //     placeholder: '不调整（如需调整请选择）',
                    // },
                    {
                        label: '商品评分',
                        type: 'number',
                        name: 'rating',
                        placeholder: '请输入商品评分，选填',
                        default:'5.0', //新增时候默认值，可选
                    },
                    {
                        label: '总销量',
                        type: 'number',
                        name: 'sale_count',
                        placeholder: '请输入总销量，选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '商品评论数量',
                        type: 'number',
                        name: 'review_count',
                        placeholder: '请输入商品评论数量，选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '商品收藏量',
                        type: 'number',
                        name: 'love_count',
                        placeholder: '请输入商品收藏量，选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '商品推荐量',
                        type: 'number',
                        name: 'recommend_count',
                        placeholder: '请输入商品推荐量，选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/shop/admin/goods-',
        });
    }
    //修改商品统计相关数据
    async saveTotalinfo() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品id'
            },
            rating: {
                type: 'float',
                required: false,
                defValue: '5.0',
                desc: '商品评分'
            },
            sale_count: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '总销量'
            },
            review_count: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '商品评论数量'
            },
            love_count: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '商品收藏量'
            },
            recommend_count: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '商品推荐量'
            },
        });

        // 参数
        const id = ctx.params.id;
        const {  rating, sale_count, review_count, love_count, recommend_count } = ctx.request.body;
        // 先看一下是否存在
        // let dataclass = await app.model.GoodsClass.findOne({ where: { id:goods_class_id } });
        // if (!dataclass) {
        //     return ctx.apiFail('该商品分类记录不存在');
        // }
        let data = await app.model.Goods.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        //存在
        // const Op = this.app.Sequelize.Op;//拿Op,固定写法
        // //只要不放在同一分类级别下还是可以的
        // const hasdata = await app.model.GoodsClass.findOne({
        //     where: {
        //         name,
        //         id: {
        //             [Op.ne]: id
        //         }
        //     }
        // });
        // if (hasdata && hasdata.pid == pid) {
        //     return ctx.apiFail('同一个分类下不能有相同的商品分类名称');
        // }
        // 修改数据
        data.rating = rating;
        data.sale_count = sale_count;
        data.review_count = review_count;
        data.love_count = love_count;
        data.recommend_count = recommend_count;
        
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改成功');
    }

    //修改商品标签相关界面
    async editTags() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Goods.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该商品不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前商品分类数据', currentdata);
        // return;

        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改商品:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/shop/admin/goods-/' + id + '/saveTags',
                //  字段
                fields: [
                    // {
                    //     label: '放在哪个商品分类里面',
                    //     type: 'dropdown', //下拉框
                    //     name: 'goods_class_id',
                    //     default: JSON.stringify(data),
                    //     placeholder: '不调整（如需调整请选择）',
                    // },
                    {
                        label: '商品标签',
                        type: 'textarea',
                        name: 'goods_tags',
                        placeholder: '请输入商品标签，选填,如：近期销量飙升，30天上新，近7天同类热卖，24小时内发货',
                        default:'', //新增时候默认值，可选
                    },
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/shop/admin/goods-',
        });
    }
    //修改商品标签相关数据
    async saveTags() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品id'
            },
            goods_tags: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '商品标签',
                range:{
                    min:2,
                    max:2000
                }
            },
        });

        // 参数
        const id = ctx.params.id;
        const {  goods_tags } = ctx.request.body;
        // 先看一下是否存在
        // let dataclass = await app.model.GoodsClass.findOne({ where: { id:goods_class_id } });
        // if (!dataclass) {
        //     return ctx.apiFail('该商品分类记录不存在');
        // }
        let data = await app.model.Goods.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        //存在
        // const Op = this.app.Sequelize.Op;//拿Op,固定写法
        // //只要不放在同一分类级别下还是可以的
        // const hasdata = await app.model.GoodsClass.findOne({
        //     where: {
        //         name,
        //         id: {
        //             [Op.ne]: id
        //         }
        //     }
        // });
        // if (hasdata && hasdata.pid == pid) {
        //     return ctx.apiFail('同一个分类下不能有相同的商品分类名称');
        // }
        // 修改数据
        data.goods_tags = goods_tags;

        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改成功');
    }
```


## 二、给商品添加图片到 `goods_banner`表
## 1. 总路由
`app/router/admin/shop.js`
```js
//商品图片处理
router.get('/shop/admin/goods-/:goods_id/createGoodsBanner', controller.admin.goods.createGoodsBanner);
router.post('/shop/admin/goods-/:goods_id/saveGoodsBanner', controller.admin.goods.saveGoodsBanner);
router.get('/shop/admin/goods-/:goods_id/indexGoodsBanner', controller.admin.goods.indexGoodsBanner);
router.get('/shop/admin/goods-/:id/editGoodsBanner', controller.admin.goods.editGoodsBanner);
router.post('/shop/admin/goods-/:id/updateGoodsBanner', controller.admin.goods.updateGoodsBanner);
router.get('/shop/admin/goods-/:id/deleteGoodsBanner', controller.admin.goods.deleteGoodsBanner);
//修改商品标签相关界面和数据
...
```
## 2. 新建商品图片模型
`app/model/goods_banner.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const GoodsBanner = app.model.define('goods_banner', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键id'
        },
        goods_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            // defaultValue:0,
            comment: '商品id',
            references: { //关联关系
                model: 'goods', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        url: {
            type: STRING(1000),
            allowNull: false,
            defaultValue: '',
            comment: '图片地址'
        },
        order: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 50,
            comment: '排序，默认50'
        },
        status: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: '状态：1：启用，0：禁用'
        },
        // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
        create_time: {
            type: DATE,
            allowNull: false,
            defaultValue: app.Sequelize.fn('NOW'),
            get() {
                return app.formatTime(this.getDataValue('create_time'));
            }
        },
        update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') }
    });


    // 模型关联关系
    GoodsBanner.associate = function (models) {
        // 关联商品 反向一对多
        GoodsBanner.belongsTo(app.model.Goods, {
            foreignKey: 'goods_id' // 明确指定外键字段
        });
    }

    return GoodsBanner;
}
```

## 3. 控制器代码
`app/controller/admin/goods.js`
```js
    //商品图片部分
    //新增商品图片界面
    async createGoodsBanner(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            goods_id: {
                type: 'int',
                required: true,
                // defValue: 0,
                desc: '商品id',
                range:{
                    min:1
                }
            },
        });
        // 参数
        const goods_id = ctx.params.goods_id;
        let data = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        //渲染公共模版
        await ctx.renderTemplate({
            title: '添加商品：' + data.name + '的图片',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/shop/admin/goods-/" + goods_id + "/saveGoodsBanner",
                //  字段
                fields: [
                    // {
                    //     label: '放在哪个商品分类里面',
                    //     type: 'dropdown', //下拉框
                    //     name: 'goods_class_id',
                    //     default: JSON.stringify(data),
                    //     placeholder: '请选择一个商品分类',
                    // },
                    {
                        label: '商品图片地址',
                        type: 'file', //fileoss - 上传到oss云存储里面， file-上传到自己的服务器上
                        name: 'url',
                        placeholder: '请选择商品图片',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序，默认50，越小越靠前',
                        default:'50', //新增时候默认值，可选
                    },
                    {
                        label: '状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用', checked: true },
                            { value: 0, name: '不可用' },
                        ]),
                        placeholder: '状态 0不可用 1可用 等等状态',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/shop/admin/goods-/' + goods_id + '/indexGoodsBanner',
        });
    }
    //新增商品图片数据
    async saveGoodsBanner(){
        const { ctx, app } = this;
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            goods_id: {
                type: 'int',
                required: true,
                // defValue: 0,
                desc: '商品id',
                range:{
                    min:1
                }
            },
            status: {
                type: 'int',
                required: false,
                defValue: 1,
                desc: '状态 0不可用 1可用 等等状态',
                range:{
                    in:[0,1]
                }
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
            url: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '商品图片地址'
            }
        });
        // 看一下商品是否存在
        let goods_id = ctx.params.goods_id;
        let { status, order,url} = this.ctx.request.body;
        if (!await this.app.model.Goods.findOne({ where: { id: goods_id } })) {
            return this.ctx.apiFail('商品不存在，不能上传商品图片');
        }
        // const Op = this.app.Sequelize.Op;//拿Op,固定写法
        // //分类名称，是否已经存在，如果存在，但是只要不放在同一分类下还是可以的
        // const hasdata = await app.model.GoodsClass.findOne({
        //     where: {
        //         name,
        //         pid:pid
        //     }
        // });
        // if (hasdata) {
        //     return ctx.apiFail('同一个分类下不能有相同的分类名称');
        // }
        //写入数据库
        const res = await this.app.model.GoodsBanner.create({
            goods_id,status, order,url
        });
        this.ctx.apiSuccess('上传商品图片成功');
    }
    //商品图片列表
    async indexGoodsBanner(){}
    //修改商品图片界面
    async editGoodsBanner(){}
    //修改商品图片界面数据
    async updateGoodsBanner(){}
    //删除商品图片
    async deleteGoodsBanner(){}
```
## 三、`goods_banner`表列表展示，修改，删除
### 1. 控制器代码
`app/controller/admin/goods.js`
```js
    //商品图片列表
    async indexGoodsBanner(){
        const { ctx, app } = this;
        //参数
        const classId = parseInt(ctx.params.goods_id);
        let page = parseInt(ctx.params.page) || 1;

        let limit = parseInt(ctx.query.limit) || 10;
        let order = ctx.query.order || 'asc';
        let keyword = ctx.query.keyword || '';
        let where = {};
        if(keyword){
            where.name = {
                [this.app.Sequelize.Op.like]:'%'+keyword+'%',
            };
        }


        //查看分类id是否存在
        let classdata = await app.model.Goods.findOne({
            where:{
                id:classId,
                status:1
            }
        });
        if(!classdata){
            return ctx.apiFail('该商品不存在或已禁用');
        }
        /*
        //存在，则查图片列表
        let list = await app.model.GoodsBanner.findAll({
            where:{
                goods_id:classId,
                status:1,
                // name:{
                //     [this.app.Sequelize.Op.like]:'%'+keyword+'%',
                // }
                ...where,
            },
            offset:(page-1)*limit,
            limit,
            order:[
                ['order',order]
            ],
            // attributes:['id','name','url'],
            attributes:{
                exclude:['create_time','update_time']
            },
            include:[
                {
                    model:app.model.Goods,
                    // as:'imageClass',
                    // attributes:{
                    //     exclude:['create_time','update_time']
                    // },
                    attributes:['name'],
                }
            ]
        });
        let totalCount = await app.model.GoodsBanner.count({
            where:{
                goods_id:classId,
                status:1,
                ...where,
            }
        });
        ctx.apiSuccess({
            list,
            totalCount
        });
        */
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('GoodsBanner',{
            goods_id:classId
        },{
            include:[{
                model:app.model.Goods,
                attributes:['id','name']
            }]
        });
        // let data = await ctx.service.imageClass.datalist({ limit: 10000 });
        // console.log('分类数据', data);
        // ctx.body = data;
        // return;
        // data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '商品：' + classdata.name + '下的全部图片',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/goods-/'+ classId +'/createGoodsBanner',//新增路径
                        desc: '上传图片',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '图片',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            // if (item.level) {
                            //     let w = item.level * 40;
                            //     return `<span style="display:inline-block;width:${w}px"></span>`;
                            // }
                            return `
                              <div style="display:flex;">
                                 <img src="${item.url}" style="width:100px;height:100px;" />
                              </div>
                            `;
                        }
                    },
                    // {
                    //     title: '是否是导航栏栏目',
                    //     key: 'isnav',
                    //     width: 200,//可选
                    //     class: 'text-center',//可选
                    //     hidekeyData: true,//是否隐藏key对应的数据
                    //     render(item) {
                    //         console.log('可用状态里面每个item', item);
                    //         let arr = [
                    //             { value: 1, name: '是' },
                    //             { value: 0, name: '否' },
                    //         ];
                    //         let str = `<div class="btn-group btn-group-${item.id}">`;
                    //         for (let i = 0; i < arr.length; i++) {
                    //             str += `<button type="button" class="btn btn-light" data="${item.isnav}"
                    //             value="${arr[i].value}"
                    //             @click="changeBtnStatus('isnav','btn-group-${item.id}',${arr[i].value},${i},${item.id},'category','Category')">${arr[i].name}</button>`;
                    //         }
                    //         str += `</div>`;
                    //         return str;
                    //     }
                    // },
                    {
                        title: '排序',
                        key: 'order',
                        class: 'text-center',//可选
                    },
                    {
                        title: '可用状态',
                        key: 'status',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            // console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '可用' },
                                { value: 0, name: '不可用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods-/${classId}/indexGoodsBanner','GoodsBanner')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    {
                        title: '操作',
                        class: 'text-right',//可选
                        action: {
                            //修改
                            edit: function (id) {
                                return `/shop/admin/goods-/${id}/editGoodsBanner`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/goods-/${id}/deleteGoodsBanner`;
                            }
                        }
                    },
                ],
            },
        });
    }
    //修改商品图片界面
    async editGoodsBanner(){
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.GoodsBanner.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该商品图片不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前商品分类数据', currentdata);
        // return;

        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改图片',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/shop/admin/goods-/' + id + '/updateGoodsBanner',
                //  字段
                fields: [
                    // {
                    //     label: '放在哪个商品分类里面',
                    //     type: 'dropdown', //下拉框
                    //     name: 'goods_class_id',
                    //     default: JSON.stringify(data),
                    //     placeholder: '不调整（如需调整请选择）',
                    // },
                    {
                        label: '商品图片地址',
                        type: 'file', // fileoss - 上传到oss云存储里面， file-上传到自己的服务器上
                        name: 'url',
                        placeholder: '请选择商品图片',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序',
                        // default:50,
                    },
                    {
                        label: '可用状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用', checked: currentdata.status === 1 },
                            { value: 0, name: '不可用', checked: currentdata.status === 0 },
                        ]),
                        placeholder: '状态 0不可用 1可用 等等状态',
                    },
                    
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/shop/admin/goods-/'+currentdata.goods_id+'/indexGoodsBanner',
        });
    }
    //修改商品图片数据
    async updateGoodsBanner(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品id'
            },
            status: {
                type: 'int',
                required: false,
                defValue: 1,
                desc: '状态 0不可用 1可用 等等状态',
                range:{
                    in:[0,1]
                }
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
            url: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '商品图片地址'
            }
        });

        // 参数
        const id = ctx.params.id;
        const {  status, order, url } = ctx.request.body;
        // 先看一下是否存在
        let data = await app.model.GoodsBanner.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该图片不存在');
        }
        let goods_id = data.goods_id;
        //存在
        // const Op = this.app.Sequelize.Op;//拿Op,固定写法
        // //只要不放在同一分类级别下还是可以的
        // const hasdata = await app.model.GoodsClass.findOne({
        //     where: {
        //         name,
        //         id: {
        //             [Op.ne]: id
        //         }
        //     }
        // });
        // if (hasdata && hasdata.pid == pid) {
        //     return ctx.apiFail('同一个分类下不能有相同的商品分类名称');
        // }
        // 修改数据
        data.goods_id = goods_id;
        data.status = status;
        data.order = order;
        data.url = url;
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改图片成功');
    }
    //删除商品图片
    async deleteGoodsBanner(){
        const { ctx, app } = this;
        const id = ctx.params.id;

        let data = await app.model.GoodsBanner.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该图片不存在');
        }
        await app.model.GoodsBanner.destroy({
            where: {
                id
            }
        });
        //提示
        ctx.toast('图片删除成功', 'success');
        //跳转
        ctx.redirect('/shop/admin/goods-/'+data.goods_id+'/indexGoodsBanner');
    }
```