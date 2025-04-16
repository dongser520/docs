---
navbar: true
sidebar: auto
title: thinkphp上传图片文件
---

前言
> 本期我们使用阿里云存储OSS，实现图片上传的功能，将我们上传的图片存储到阿里云存储OSS。

## 一、配置阿里云存储，拿到密钥和bucket等信息
来到阿里云控制台： `控制台` -> `对象存储` -> `OSS`
> 1. 阿里云的云存储OSS默认是私有权限，创建完`Bucket`之后，可在`Bucket列表`-> `找到创建的Bucket` -> `权限控制` -> `阻止公共访问【关闭】` -> `读写权限` -> `公共读写` <br/>
> 2. `概览`-> `访问端口栏目` -> `配置Bucket信息` <br/>
> 3. 如何查看或设置`accessId`及`accessSecret` <br/>
>> 1. `权限控制` -> `访问控制RAM` -> `前往RAM控制台` <br/>
>> 2. `身份管理` -> `用户组` -> `创建用户组`
>>> ① 用户组名称： `OSS` <br/>
>>> ② 显示名称：`OSS操作组` <br/>
>>> ③ 备注：`OSS操作组，用于测试文件上传、查看等`<br/>
>> 3. 创建完成之后，进入刚刚创建的用户组 <br/>
>>> ① `权限管理` -> `新增授权`-> `搜索 oss ` -> 将 `oss`相关权限勾上 `AliyunOSSFullAccess`,`AliyunOSSReadOnlyAccess` <br/>
>>> ② `身份管理` -> `用户` -> `创建用户` <br/>
>>>> 用户账号信息: 
>>>>> 1. 登录名称: `thinkphp_eggjs` <br/>
>>>>> 2. 显示名称: `thinkphp_eggjs两套框架上传图片等文件`<br/>
>>>> 访问方式: <br/>
>>>>> 1. 选择用 `使用永久 AccessKey 访问创建 AccessKey ID 和 AccessKey Secret，支持通过 API 或其他开发工具访问` <br/>
>>>> 创建成功后，可复制 `AccessKey ID` 和 `AccessKey Secret`，用于配置文件系统 <br/>
>> 4.  `选中创建的用户` -> `添加到用户组` -> `OSS操作组` -> `确定` <br/>

## 二、 阿里云OSS图片上传功能实现
### 1. 路由
`route/admin.php`
```php
<?php
use think\facade\Route;
...
// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){
    ...
    // 图片上传阿里云
    Route::post('/image/upload','admin.Image/uploadAliyunOSS');   
//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```
### 2. 首先安装阿里云OSS SDK
> 在项目根目录下运行：
```php
composer require aliyuncs/oss-sdk-php
```
### 3. 配置oss
`config/oss.php`
```php
<?php
return [
    'accessKeyId'     => '你的阿里云AccessKeyId',
    'accessKeySecret' => '你的阿里云accessKeySecret',
    'bucket'         => 'thinkphp-eggjs',
    'endpoint'       => 'oss-cn-hangzhou.aliyuncs.com',
    'domain'         => 'https://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com'
];
```
### 4. 创建公共方法 (common.php)
`app/common.php`
```php
use OSS\OssClient;
use OSS\Core\OssException;

/**
 * 上传文件到阿里云OSS
 * @param string $fieldName 文件字段名
 * @param int $classId 图片分类ID
 * @param string $bucketFolder 阿里云OSS bucket的列表文件夹名
 * @return array
 */
function uploadFile($fieldName, $classId = 0,$bucketFolder = 'images') {
    try {
        // 获取上传文件
        $files = request()->file($fieldName);
        
        // 如果是单文件上传，转换为数组形式统一处理
        if (!is_array($files)) {
            $files = [$files];
        }
        
        // 阿里云OSS配置
        $config = config('oss');
        
        // 初始化OSS客户端
        $ossClient = new OssClient(
            $config['accessKeyId'], 
            $config['accessKeySecret'], 
            $config['endpoint']
        );
        
        $result = [];
        foreach ($files as $file) {
            // 验证文件
            if (!$file) {
                throw new \Exception('没有文件被上传');
            }
            
            // 验证文件类型和大小等
            validate(['file' => [
                'fileSize' => 1024 * 1024 * 5, // 限制5M
                'fileExt'  => 'jpg,jpeg,png,gif,bmp', // 限制后缀
                'fileMime' => 'image/jpeg,image/png,image/gif,image/bmp' // 限制类型
            ]])->check(['file' => $file]);
            
            // 生成文件名
            $fileExt = $file->extension(); // 文件扩展名
            $fileName = $bucketFolder.'/' . date('Ymd') . '/' . uniqid() . '.' . $fileExt;
            
            // 上传到OSS
            $ossClient->uploadFile($config['bucket'], $fileName, $file->getPathname());
            
            // 返回结果
            $result[] = [
                'url' => $config['domain'] . '/' . $fileName,
                'path' => $fileName,
                'image_class_id' => $classId,
                'create_time' => time()
            ];
        }
        
        return count($result) > 1 ? $result : $result[0];
        
    } catch (OssException $e) {
        throw new \Exception('OSS上传失败: ' . $e->getMessage());
    } catch (\Exception $e) {
        throw new \Exception('上传失败: ' . $e->getMessage());
    }
}
```

### 5. 控制器代码： 测试上传效果
`app/controller/admin/Image.php` <br/><br/>
tp6官方文档上传功能说明： <https://www.kancloud.cn/manual/thinkphp6_0/1037639> 
```php
...
use app\BaseController;

class Image extends BaseController
{
    
    // 图片上传阿里云
    public function uploadAliyunOSS(Request $request)
    {
        try {
            // 图片分类id, 没有传默认为0
            $classId = getValueByKey('image_class_id', $this->request->param(), 0);

            // 上传图片
            $result = uploadFile('img', $classId, 'images'); 

            // 根据你的业务需求，这里可以将结果保存到数据库
            // ...

            return json([
                'code' => 200,
                'msg' => '上传成功',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return json([
                'code' => 500,
                'msg' => $e->getMessage(),
                'data' => null
            ]);
        }
    }

    
}

```
说明：<br/>
> 1. 最终上传成功之后，会在`阿里云OSS`-`bucket`里面生成一个文件夹：`images`,上传的文件存储在这个文件夹里面。<br/>
> 2. `postman`测试：`POST请求` `Body->form-data` <br/>
>> 1. 单图上传: form-data 中添加文件字段 `img` <br/>
>> 2. 多图上传: form-data 中添加文件字段 `img[]`(注意要加中括号表示是数组) <br/>
> 3. 测试返回结果：
>>```json
>> // 单图
>> {
>>     "code": 200,
>>     "msg": "上传成功",
>>     "data": {
>>         "url": "https://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250416/67ff3076776bd.png",
>>         "path": "images/20250416/67ff3076776bd.png",
>>         "image_class_id": 0,
>>         "create_time": 1744777334
>>     }
>> }
>> //多图
>> {
>>     "code": 200,
>>     "msg": "上传成功",
>>     "data": [
>>         {
>>             "url": "https://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250416/67ff3093ef1cd.png",
>>             "path": "images/20250416/67ff3093ef1cd.png",
>>             "image_class_id": 0,
>>             "create_time": 1744777364
>>         },
>>         {
>>             "url": "https://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250416/67ff30941f149.jpg",
>>             "path": "images/20250416/67ff30941f149.jpg",
>>             "image_class_id": 0,
>>             "create_time": 1744777364
>>         }
>>     ]
>> }
>> ```

### 6. 控制器代码完整代码
#### 1. 参数验证
`app/validate/admin/Image.php`
```php
...
use app\validate\BaseValidate;

class Image extends BaseValidate
{
    
    protected $rule = [
        'image_class_id|图片分类id'=>'integer|>=:0|isExist:ImageClass,false',

    ];

    ...

    protected $scene = [
        // 上传图片到阿里云OSS
        'uploadAliyunOSS' => ['image_class_id'],
    ];
}
```



