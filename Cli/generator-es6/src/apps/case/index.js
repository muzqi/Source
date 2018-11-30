
import './index.css'
import loader from '@/loader/loader'
import apis from './mock/index'
import caseTrendRender from './caseTrend/index'
import caseOccupyRender from './caseOccupy/index'

loader.load({
  apis,
  init() {
    caseTrendRender()
    caseOccupyRender()
  }
}, 1400, 2100)
