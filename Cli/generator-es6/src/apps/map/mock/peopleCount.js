/**
 * @Author:      zhanghq
 * @DateTime:    2017-12-28 23:29:35
 * @Description: 总数统计数据
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-12-28 23:29:35
 */

export default {
  url: '/people/peopleCount',
  mock: {
    'code': 1,
    'msg': 'success',
    'result': {
      'count': {
        'country': {
          'value|1-100000': 1,
          'rate|1-100': 1, 
          'flag|+1': [1, -1]
        },
        'city': {
          'value|1-100000': 1,
          'rate|1-100': 1, 
          'flag|+1': [1, -1]
        },
        'arrest|1-100000': 1,
        'regulate|1-100000': 1,
        'risk|1-100000': 1
      }
    }
  }
}
