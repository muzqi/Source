/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-16 09:45:07
 * @Description: Redux 调试工具
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 09:55:18
 */

import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'>
    <LogMonitor />
  </DockMonitor>
)
