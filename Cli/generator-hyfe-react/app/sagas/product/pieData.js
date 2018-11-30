/*
 * @Author: baizn 
 * @Email: baizhanning@hiynn.com 
 * @Description: 饼图Mock数据
 * @Date: 2018-03-12 11:39:21 
 * @Last Modified by: baizn
 * @Last Modified time: 2018-03-12 11:39:43
  */

export default {
  url: '/pie',
  mock: {
    'code': 1,
    'msg': 'success',
    'result|2-5': [
      {
        'name|+1': ['苹果', 'OPPO', '三星', '华为', '小米'],
        'value|10-100': 1,
        'child|2-5': [
          {
            'name': '@cname',
            'value|10-100': 1
          }
        ]
      }
    ]
  }
}