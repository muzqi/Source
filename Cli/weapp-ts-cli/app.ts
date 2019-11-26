/*
 * @Author: liqi1@cmiot.chinamobile.com
 * @Tel:  19823363089
 * @Date: 2019-11-21 22:57:02
 * @Description:
 * @Last Modified by: liqi1@cmiot.chinamobile.com
 * @Last Modified time: 2019-11-26 13:34:14
 */

App<AppInterface>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });

    // 获取用户信息
    wx.getSetting({
      success: result => {
        if (result.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
});
