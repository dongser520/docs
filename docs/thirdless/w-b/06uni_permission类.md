---
navbar: true
sidebar: auto
title: 章节6.uni_permission.js权限申请类（支持多端）
---

## 一、 `uni_permission.js`权限申请类代码
`/common/mixins/uni_permission.js`
```js
// /common/mixins/uni_permission.js

const PERMISSION_TYPES = {
    LOCATION: 'location',
    MICROPHONE: 'microphone',
    CAMERA: 'camera',
    PHOTO: 'photo',
    CONTACTS: 'contacts',
    CALENDAR: 'calendar',
    MEMO: 'memo'
};

// 权限状态缓存
const permissionCache = {
    mp: {},
    android: {},
    ios: {}
};

// 全局安卓权限回调处理
let androidPermissionCallback = null;
let androidPermissionRegistered = false;

export default class UniPermission {
    constructor() {
        this.platform = this.getPlatform();
        // 注册安卓权限回调
        this._registerAndroidCallback();
    }

    // 注册安卓权限回调
    _registerAndroidCallback() {
        // #ifdef APP-PLUS
        if (this.platform === 'APP_ANDROID' && !androidPermissionRegistered) {
            androidPermissionRegistered = true;
            
            const mainActivity = plus.android.runtimeMainActivity();
            if (mainActivity.setRequestPermissionsResultHandler) {
                mainActivity.setRequestPermissionsResultHandler((requestCode, permissions, grantResults) => {
                    console.log('[安卓权限回调触发] 请求码:', requestCode, '权限:', permissions, '结果:', grantResults);
                    if (requestCode === 100 && androidPermissionCallback) {
                        androidPermissionCallback(requestCode, permissions, grantResults);
                        androidPermissionCallback = null; // 清除回调
                    }
                });
            }
        }
        // #endif
    }

    // 获取当前平台
    getPlatform() {
        // #ifdef H5
        return 'H5';
        // #endif
        // #ifdef MP-WEIXIN
        return 'MP_WEIXIN';
        // #endif
        // #ifdef APP-PLUS
        return plus.os.name.toLowerCase() === 'android' ? 'APP_ANDROID' : 'APP_IOS';
        // #endif
        return 'UNKNOWN';
    }

    // 统一权限申请方法
    async requestPermission(permissionType, purposeText, title = "权限申请") {
        this._showLoading('正在检查权限...');

        try {
            // 检查权限缓存
            const cacheKey = `${this.platform}_${permissionType}`;
            if (permissionCache[cacheKey] === true) {
                this._hideLoading();
                return true;
            }

            let result;
            switch (this.platform) {
                case 'H5':
                    result = await this._requestH5Permission(permissionType, purposeText, title);
                    break;
                case 'MP_WEIXIN':
                    result = await this._requestMpPermission(permissionType, purposeText, title);
                    break;
                case 'APP_ANDROID':
                    result = await this._requestAndroidPermission(permissionType, purposeText, title);
                    break;
                case 'APP_IOS':
                    result = await this._requestIosPermission(permissionType, purposeText, title);
                    break;
                default:
                    result = false;
            }

            // 缓存授权结果
            if (result) {
                permissionCache[cacheKey] = true;
            }

            return result;
        } catch (error) {
            console.error('权限申请异常:', error);
            return false;
        } finally {
            this._hideLoading();
        }
    }

    // H5平台权限申请
    async _requestH5Permission(permissionType, purposeText, title = "权限申请") {
        try {
            switch (permissionType) {
                case PERMISSION_TYPES.LOCATION:
                    return await this._showCustomDialog(purposeText, title).then(async () => {
                        const position = await this._getH5Location();
                        return !!position;
                    });
                case PERMISSION_TYPES.MICROPHONE:
                    return await this._showCustomDialog(purposeText, title).then(async () => {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            audio: true
                        });
                        stream.getTracks().forEach(track => track.stop());
                        return true;
                    });
                case PERMISSION_TYPES.CAMERA:
                    return await this._showCustomDialog(purposeText, title).then(async () => {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: true
                        });
                        stream.getTracks().forEach(track => track.stop());
                        return true;
                    });
                case PERMISSION_TYPES.PHOTO:
                    // H5不需要特殊权限，直接返回true
                    return true;
                default:
                    console.warn(`H5 does not support ${permissionType} permission request`);
                    return true;
            }
        } catch (error) {
            console.error('H5 permission request error:', error);
            return false;
        }
    }

    // 微信小程序权限申请
    async _requestMpPermission(permissionType, purposeText, title = "权限申请") {
        const scopeMap = {
            [PERMISSION_TYPES.LOCATION]: 'scope.userLocation',
            [PERMISSION_TYPES.MICROPHONE]: 'scope.record',
            [PERMISSION_TYPES.CAMERA]: 'scope.camera',
            [PERMISSION_TYPES.PHOTO]: 'scope.writePhotosAlbum'
        };

        const scope = scopeMap[permissionType];
        if (!scope) {
            console.warn(`Unsupported permission type for MP: ${permissionType}`);
            return true;
        }

        // 第一步：检查权限状态
        try {
            this._updateLoading('正在检查权限状态...');
            const settingRes = await uni.getSetting();

            // 1. 如果已经是授权状态，直接返回true
            if (settingRes.authSetting[scope] === true) {
                return true;
            }

            // 2. 如果是拒绝状态，引导用户打开设置
            if (settingRes.authSetting[scope] === false) {
                return await this._guideToMpSetting(scope, purposeText);
            }
        } catch (error) {
            console.error('获取权限设置失败:', error);
        }

        // 第二步：显示自定义对话框（仅当权限状态未知时）
        this._updateLoading('');
        const userAgreed = await this._showCustomDialog(purposeText, title);
        if (!userAgreed) return false;

        // 第三步：调用微信API申请权限
        try {
            this._showLoading('请求权限中...');
            const authRes = await uni.authorize({
                scope
            });
            return authRes.errMsg === 'authorize:ok';
        } catch (error) {
            if (error.errMsg.includes('auth deny') || error.errMsg.includes('auth denied')) {
                return await this._guideToMpSetting(scope, purposeText);
            }
            return false;
        }
    }

    // 引导用户打开小程序设置
    async _guideToMpSetting(scope, purposeText) {
        const res = await uni.showModal({
            title: '权限被拒绝',
            content: `您已拒绝${purposeText}，是否去设置页面开启权限？`,
            confirmText: '去设置',
            cancelText: '取消'
        });

        if (res.confirm) {
            const settingRes = await uni.openSetting();
            return settingRes.authSetting[scope] === true;
        }
        return false;
    }

    // Android平台权限申请
    async _requestAndroidPermission(permissionType, purposeText, title = "权限申请") {
        const permissions = {
            [PERMISSION_TYPES.PHOTO]: [
                'android.permission.READ_EXTERNAL_STORAGE',
                'android.permission.WRITE_EXTERNAL_STORAGE'
            ],
            // ...其他权限
        }[permissionType] || [];
    
        if (permissions.length === 0) return true;
    
        // 1. 检查权限状态
        this._updateLoading('正在检查权限状态...');
        const Context = plus.android.importClass('android.content.Context');
        const PackageManager = plus.android.importClass('android.content.pm.PackageManager');
        const mainActivity = plus.android.runtimeMainActivity();
        const context = mainActivity.getApplicationContext();
    
        let hasPermission = true;
        for (const perm of permissions) {
            if (context.checkSelfPermission(perm) !== PackageManager.PERMISSION_GRANTED) {
                hasPermission = false;
                break;
            }
        }
    
        // 2. 如果已有权限，直接返回
        if (hasPermission) {
            return true;
        }
    
        // 3. 显示自定义弹窗说明权限用途
        this._updateLoading('');
        const userAgreed = await this._showCustomDialog(purposeText, title);
        if (!userAgreed) return false;
    
        // 4. 动态请求权限
        this._showLoading('请求权限中...');
        
        return new Promise((resolve) => {
            // 使用全局回调处理
            androidPermissionCallback = (requestCode, perms, grantResults) => {
                console.log('[安卓权限回调处理] 请求码:', requestCode, '权限:', perms, '结果:', grantResults);
                if (requestCode !== 100) {
                    console.log('[警告] 收到非预期请求码:', requestCode);
                    resolve(false);
                    return;
                }
                
                const PackageManager = plus.android.importClass('android.content.pm.PackageManager');
                let granted = true;
                
                // 检查所有权限是否都被授予
                for (let i = 0; i < grantResults.length; i++) {
                    if (grantResults[i] !== PackageManager.PERMISSION_GRANTED) {
                        granted = false;
                        break;
                    }
                }
                
                if (granted) {
                    console.log('[成功] 所有权限已授予');
                    resolve(true);
                } else {
                    console.log('[警告] 部分权限被拒绝');
                    // 部分权限被拒绝，引导设置
                    this._guideToAppSetting(purposeText, title).then(resolve);
                }
            };
    
            // 发起权限请求
            console.log('[发起安卓权限请求]', permissions);
            
            // 在权限请求中添加监听
            const handleAppShow = (event) => {
                console.log('应用回到前台，隐藏时长:', event.hideDuration || 0);
                
                // 根据隐藏时间调整延迟
                const delay = event.hideDuration > 3000 ? 1500 : 800;
                console.log(`设置延迟 ${delay}ms 后检查权限`);
                
                setTimeout(async () => {
                    console.log('延迟后检查权限状态');
                    
                    // 重新检查权限状态
                    let allGranted = true;
                    for (const perm of permissions) {
                        const result = context.checkSelfPermission(perm);
                        console.log(`权限 ${perm} 状态: ${result}`);
                        
                        if (result !== PackageManager.PERMISSION_GRANTED) {
                            allGranted = false;
                        }
                    }
                    
                    if (allGranted) {
                        console.log('[成功] 应用回到前台后权限已授予');
                        resolve(true);
                        clearTimeout(timeoutId);
                        uni.$off('app_show', handleAppShow);
                    } else {
                        console.log('[警告] 应用回到前台后权限未授予');
                        
                        // 尝试再次检查（最多3次）
                        if (retryCount < 3) {
                            retryCount++;
                            console.log(`[重试] 第${retryCount}次检查权限`);
                            checkPermission();
                        } else {
                            console.log('[失败] 多次检查后权限仍未授予');
                            resolve(false);
                        }
                    }
                }, delay);
            };
            
            // 重试计数器
            let retryCount = 0;
            const checkPermission = () => {
                setTimeout(() => {
                    let allGranted = true;
                    for (const perm of permissions) {
                        const result = context.checkSelfPermission(perm);
                        console.log(`[重试检查] 权限 ${perm} 状态: ${result}`);
                        
                        if (result !== PackageManager.PERMISSION_GRANTED) {
                            allGranted = false;
                        }
                    }
                    
                    if (allGranted) {
                        console.log('[成功] 重试检查后权限已授予');
                        resolve(true);
                        clearTimeout(timeoutId);
                        uni.$off('app_show', handleAppShow);
                    } else if (retryCount < 3) {
                        retryCount++;
                        console.log(`[重试] 第${retryCount}次检查权限`);
                        checkPermission();
                    } else {
                        console.log('[失败] 多次重试后权限仍未授予');
                        resolve(false);
                    }
                }, 500); // 每次重试间隔500ms
            };
            
            // 监听应用回到前台事件
            uni.$on('app_show', handleAppShow);
            
            // 设置超时清除监听
            const timeoutId = setTimeout(() => {
                console.log('[超时] 权限请求超时，清除监听');
                uni.$off('app_show', handleAppShow);
                resolve(false);
            }, 15000); // 延长到15秒
            
            // 发起请求
            mainActivity.requestPermissions(permissions, 100);
        });
    }
	
    // iOS平台权限申请
    async _requestIosPermission(permissionType, purposeText, title = '权限申请') {
        const permissionMap = {
            [PERMISSION_TYPES.LOCATION]: 'location',
            [PERMISSION_TYPES.MICROPHONE]: 'microphone',
            [PERMISSION_TYPES.CAMERA]: 'camera',
            [PERMISSION_TYPES.PHOTO]: 'photo',
            [PERMISSION_TYPES.CONTACTS]: 'contacts',
            [PERMISSION_TYPES.CALENDAR]: 'calendar',
            [PERMISSION_TYPES.MEMO]: '' // iOS没有直接的备忘录权限
        };

        const permission = permissionMap[permissionType];
        if (!permission) return true;

        // 第一步：显示自定义对话框
        const userAgreed = await this._showCustomDialog(purposeText, title);
        if (!userAgreed) return false;

        // 第二步：申请权限
        try {
            const result = await plus.ios.requestPermissions([permission]);
            if (result[permission] === 3) { // 3: 已授权
                return true;
            }
            return await this._guideToAppSetting(purposeText, title);
        } catch (error) {
            console.error('iOS permission request error:', error);
            return await this._guideToAppSetting(purposeText, title);
        }
    }

    // 显示加载提示
    _showLoading(title = '处理中...') {
        // 避免重复显示
        if (!this._loadingShown) {
            uni.showLoading({
                title: title,
                mask: true
            });
            this._loadingShown = true;
        }
    }

    // 更新加载提示
    _updateLoading(title) {
        if (this._loadingShown && title) {
            uni.hideLoading();
            uni.showLoading({
                title: title,
                mask: true
            });
        }
    }

    // 隐藏加载提示
    _hideLoading() {
        return new Promise(resolve => {
            if (this._loadingShown) {
                uni.hideLoading({
                    complete: () => {
                        this._loadingShown = false;
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    // 显示自定义权限申请对话框
    async _showCustomDialog(purposeText, title) {
        return new Promise((resolve) => {
            // 先隐藏加载提示
            this._hideLoading().then(() => {
                uni.showModal({
                    title: title || '权限申请',
                    content: purposeText || '我们需要您的授权以提供完整功能',
                    confirmText: '允许',
                    cancelText: '拒绝',
                    success: (res) => {
                        resolve(res.confirm);
                    },
                    fail: () => {
                        resolve(false);
                    }
                });
            });
        });
    }

    // 引导用户去应用设置
    _guideToAppSetting(purposeText, title) {
        return new Promise((resolve) => {
            // 先隐藏加载提示
            this._hideLoading().then(() => {
                uni.showModal({
                    title: title || '权限被永久拒绝',
                    content: `请在系统设置中手动开启「${purposeText}」`,
                    confirmText: '去设置',
                    success: async (res) => {
                        if (res.confirm) {
                            // 跳转系统设置
                            // #ifdef APP-ANDROID
                            const Intent = plus.android.importClass("android.content.Intent");
                            const Settings = plus.android.importClass("android.provider.Settings");
                            const Uri = plus.android.importClass("android.net.Uri");
    
                            const intent = new Intent();
                            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                            const uri = Uri.fromParts("package", plus.android.runtimeMainActivity()
                                .getPackageName(), null);
                            intent.setData(uri);
    
                            try {
                                plus.android.runtimeMainActivity().startActivity(intent);
                                
                                // 监听应用回到前台
                                const handleAppShow = () => {
                                    console.log('从设置返回，检查权限状态');
                                    setTimeout(() => {
                                        const Context = plus.android.importClass('android.content.Context');
                                        const PackageManager = plus.android.importClass('android.content.pm.PackageManager');
                                        const context = plus.android.runtimeMainActivity().getApplicationContext();
                                        
                                        let allGranted = true;
                                        for (const perm of permissions) {
                                            if (context.checkSelfPermission(perm) !== PackageManager.PERMISSION_GRANTED) {
                                                allGranted = false;
                                                break;
                                            }
                                        }
                                        
                                        if (allGranted) {
                                            console.log('[成功] 从设置返回后权限已授予');
                                            resolve(true);
                                        } else {
                                            console.log('[警告] 从设置返回后权限未授予');
                                            resolve(false);
                                        }
                                        
                                        uni.$off('app_show', handleAppShow);
                                    }, 1000);
                                };
                                
                                uni.$on('app_show', handleAppShow);
                                
                                // 设置超时
                                setTimeout(() => {
                                    uni.$off('app_show', handleAppShow);
                                    resolve(false);
                                }, 10000);
                                
                            } catch (e) {
                                console.error('跳转设置失败:', e);
                                resolve(false);
                            }
                            // #endif
                            // ...其他平台
                        } else {
                            resolve(false);
                        }
                    },
                    fail: () => resolve(false)
                });
            });
        });
    }

    // H5获取位置
    _getH5Location() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
}
```
## 二、安卓端app需要在 `App.vue` 中添加以下代码
```vue
...
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			...
			// 监听应用状态变化
			// #ifdef APP-PLUS
			let appHideTime = 0;
			
			plus.globalEvent.addEventListener('pause', () => {
				console.log('应用进入后台');
				appHideTime = Date.now();
				uni.$emit('app_hide');
			});
			
			plus.globalEvent.addEventListener('resume', () => {
				console.log('应用回到前台');
				const hideDuration = Date.now() - appHideTime;
				console.log(`应用在后台停留时间: ${hideDuration}ms`);
				uni.$emit('app_show', { hideDuration });
			});
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	...
</style>
```

## 三、调用权限类示例
如，在页面 `/pages/chat/chat.nvue`
```vue
<script>
	import UniPermission from '@/common/mixins/uni_permission.js';
    export default {
        methods: {
            // 处理相册照片
			async handlePhoto() {
			    try {
                    const permission = new UniPermission();
                    const granted = await permission.requestPermission('photo', 
                    '需要访问您的相册来选择照片','本功能需要您打开相册');
                    if (granted) {
                        //console.log('相册权限已授予，开始选择图片');
                        //this.chooseImage(); // 选择照片
                        // setTimeout(() => {this.chooseImage();}, 300);
                    } else {
                        uni.showToast({ title: '无相册权限', icon: 'none',duration: 2000});
                    }
			    } catch (error) {
                    console.error('权限申请异常:', error);
                    uni.showToast({ 
                        title: '权限申请失败: ' + error.message, 
                        icon: 'none',
                        duration: 3000
                    });
                }
			},
        }
    }
</script>
```