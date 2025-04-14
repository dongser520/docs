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

## 二、安装文件系统扩展包
参考文档： <https://gitee.com/thans/thinkphp-filesystem-cloud>

> 执行安装命令
```php
composer require thans/thinkphp-filesystem-cloud
```

## 三、配置文件系统 config/filesystem.php
```php
    // 更多的磁盘配置信息
    'aliyun' => [
        'type'         => 'aliyun',
        'accessId'     => '******',//阿里云AccessKeyId
        'accessSecret' => '******',//阿里云AccessKeySecret 
        'bucket'       => 'bucket', //Bucket名称
        'endpoint'     => 'oss-cn-hongkong.aliyuncs.com',//Endpoint（地域节点）
        'url'          => 'http://oss-cn-hongkong.aliyuncs.com',//不要斜杠结尾，Bucket 域名。
    ],
```
将阿里云存储，密钥和bucket等信息填写上
```php
<?php

return [
    // 默认磁盘
    'default' => env('filesystem.driver', 'local'),
    // 磁盘列表
    'disks'   => [
        'local'  => [
            'type' => 'local',
            'root' => app()->getRuntimePath() . 'storage',
        ],
        'public' => [
            // 磁盘类型
            'type'       => 'local',
            // 磁盘路径
            'root'       => app()->getRootPath() . 'public/storage',
            // 磁盘路径对应的外部URL路径
            'url'        => '/storage',
            // 可见性
            'visibility' => 'public',
        ],
        // 更多的磁盘配置信息
        'aliyun' => [
            'type'         => 'aliyun',
            'accessId'     => '你在阿里云的AccessKeyId', //阿里云AccessKeyId [去自己的阿里云云存储OSS里面查看]
            'accessSecret' => '你在阿里云的accessSecret', //阿里云AccessKeySecret [去自己的阿里云云存储OSS里面查看]
            'bucket'       => 'thinkphp-eggjs', //Bucket名称
            'endpoint'     => 'oss-cn-hangzhou.aliyuncs.com', //Endpoint（地域节点）
            'url'          => 'https://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com',//不要斜杠结尾，Bucket 域名。
        ],
    ],
];

```

## 四、公共函数上传图片到阿里云存储OSS
`app/common.php` <br/><br/>
tp6官方文档上传功能说明： <https://www.kancloud.cn/manual/thinkphp6_0/1037639> 
```php
// 上传图片
function uploadFile($key){
    try {
        $M = 1024 * 1024 * 2 * 5; //单位字节，2M * 5 , 最大上传多大文件
        validate([
            // 文件后缀
            $key=>'fileSize:'.$M.'|fileExt:jpg,png,gif,jpeg'
        ])->check(request()->file());
        $file = request()->file($key);
        // 单图上传
        if (!is_array($file)){
            //putFile(目录,文件,唯一标识['md5'|'uniqid'])
            // 唯一标识[uniqid已被tp内置了，即随机唯一标识，生成一个唯一文件名替换上传的文件名]
            // 唯一标识的好处是：防止后面重新上传的文件覆盖之前的同名文件
            $savename = \think\facade\Filesystem::disk('aliyun')->putFile( 'demo', $file,'uniqid');
            return str_replace('\\','/',$savename);
        }
        // 多图上传
        $result = [];
        foreach ($file as $v) {
            $result[] = \think\facade\Filesystem::disk('aliyun')->putFile( 'demo', $v,'uniqid');
        }
        return $result;
    } catch (think\exception\ValidateException $e) {
        ApiException($e->getMessage());
    }
}
```
说明：<br/>
> 最终上传成功之后，会在`阿里云OSS`-`bucket`里面生成一个文件夹：`demo`,上传的文件存储在这个文件夹里面。

