/*
 * @Author: liqi@hiynn.com 
 * @Date: 2017-12-29 00:13:51 
 * @Description: 案件占比
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2017-12-29 00:19:45
 */
const name = ['侵财', '八类', '毒品', '经济', '国保', '其他']
export default {
  'url': '/caseOccupy',
  'mock': {
    'code': 1,
    'msg': 'success',
    'result': {
      'zhanbi|6': [
        {
          'name|+1': name,
          'value|1000-8000': 1000
        }
      ]
    }
  }
}
