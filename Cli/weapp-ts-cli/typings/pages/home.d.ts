/*
 * @Author: liqi1@cmiot.chinamobile.com
 * @Tel:  19823363089
 * @Date: 2019-11-21 22:56:17
 * @Description:
 * @Last Modified by:   liqi1@cmiot.chinamobile.com
 * @Last Modified time: 2019-11-21 22:56:17
 */

interface HomePage {
  bindViewTap: () => void;
  getUserInfo: (e: any) => void;
}

interface HomeData {
  motto: String;
  userInfo: Object;
  hasUserInfo: Boolean;
  canIUse: Boolean;
}
