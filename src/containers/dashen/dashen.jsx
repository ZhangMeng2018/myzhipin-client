import React,{Component} from "react"
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'

class Dashen extends Component {

  render(){
    const {userList} = this.props;
    return <div className='contentWarp'>
      <UserList userList={userList}/>
    </div>
  }
}

export default connect(
  state => ({userList:state.userList}),
  {}
)(Dashen)