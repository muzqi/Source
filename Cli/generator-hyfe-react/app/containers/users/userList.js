import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import _ from 'lodash'
import reduxSagaInjector from '@/util/reduxSagaInjector'

const columns = [
  {
    title: '用户ID',
    dataIndex: 'id',
    key: 'id'
  },{
    title: '详情',
    dataIndex: 'detail',
    key: 'detail'
  }
]

const mapStateToProps = ({ userList }) => {
  if(!userList) return {}
  return {
    userList: userList.userList
  }
}

@connect(mapStateToProps)
class UserList extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const {dispatch} = this.props
    reduxSagaInjector(dispatch, 'USER_LIST')('fetchUserList', {list: 3}, 'userList')
  }
  render(){
    let { userList } = this.props
    if(_.isEmpty(userList)) return null
    userList = userList.map((item, index) => {
      return {
        ...item,
        key: index
      }
    })
    return (
      <Table columns={columns} dataSource={userList}/>
    )
  }
}

export default UserList