/*
 * @Author: liqi@hiynn.com 
 * @Date: 2017-12-29 00:13:30 
 * @Description: 案件趋势模拟数据
 * @Last Modified by:   liqi@hiynn.com 
 * @Last Modified time: 2017-12-29 00:13:30 
 */

const city = ['渝中', '大渡口', '江北', '沙坪坝', '南岸', '九龙坡', '北碚', '巴南', '万州', '涪陵']
const compare = ['同比', '环比']

export default {
  'url': '/caseTrend',
  'mock': {
    'code': 1,
    'msg': 'success',
    'result': {
      'compare|10': [
        {
          'name|+1': city,
          'value|2': [
            {
              'name|+1': compare,
              'value|0-1000': 0 
            }
          ]
        }
      ],
      'trend|10': [
        {
          'name|+1': city,
          'value|0-1000': 0
        }
      ]
    }
  }
}
