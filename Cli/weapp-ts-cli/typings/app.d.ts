/*
 * @Author: liqi1@cmiot.chinamobile.com
 * @Tel:  19823363089
 * @Date: 2019-11-21 23:18:26
 * @Description:
 * @Last Modified by: liqi1@cmiot.chinamobile.com
 * @Last Modified time: 2019-11-22 00:02:18
 */

/// <reference path="./wx/index.d.ts" />

interface AppInterface {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
