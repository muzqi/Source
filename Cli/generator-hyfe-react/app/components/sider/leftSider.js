/*
 * @Author: baizn 
 * @Email: baizhanning@hiynn.com 
 * @Description: 通用侧边导航栏
 * @Date: 2018-03-13 10:01:18 
 * @Last Modified by: baizn
 * @Last Modified time: 2018-03-13 14:36:32
  */

import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { Content, Sider } = Layout
const SubMenu = Menu.SubMenu
import './sider.scss'

export default class LeftSider extends Component {
  state = {
    collapsed: false
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  renderMenu = () => {
    const mockData = [
      {
        type: 'menu',
        icon: 'pie-chart',
        key: '1',
        value: 'Option 1'
      },
      {
        type: 'menu',
        icon: 'desktop',
        key: '2',
        value: 'Option 1'
      },
      {
        type: 'menu',
        icon: 'user',
        key: '3',
        value: 'User',
        children: [
          {
            type: 'sub-menu',
            icon: 'pie-chart',
            key: 'sub1',
            value: 'Tom',
          },
          {
            type: 'sub-menu',
            icon: 'pie-chart',
            key: 'sub2',
            value: 'Tom',
          }
        ]
      }
    ]
    return mockData.map(data => {
      return data.children
      ?
      <SubMenu key={data.key}
        title={<span><Icon type={data.icon} /><span>{data.value}</span></span>}>
        {
          data.children.map(cdata => {
            return <Menu.Item key={cdata.key}>{cdata.value}</Menu.Item>
          })
        }
      </SubMenu>
      :
      <Menu.Item key={data.key}>
        <Icon type={data.icon} />
        <span>{data.value}</span>
      </Menu.Item>

    })
  }

  render() {
    return (
      <Sider collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}>
        <div className='silder-logo' />
          <Menu theme='dark' mode='inline'
            defaultSelectedKeys={['1']}>
            { this.renderMenu() }
          </Menu>
      </Sider>
    )
  }
}
