/*
 * @Author: baizn 
 * @Email: baizhanning@hiynn.com 
 * @Description: 获取用户列表mock数据
 * @Date: 2018-02-12 11:11:18 
 * @Last Modified by: ouyangdecai
 * @Last Modified time: 2018-06-01 10:15:48
  */

export default {
  url: '/user/:list',
  // 默认值为false，可省略
  enableMock: false,
  mock: {
    'code': 1,
    'msg': 'success',
    'result': {
      'userList|10-15': [
        {
          'id|5-10': 100,
          'detail|30-5': '@cname'
        }
      ]
    }
  }
}
