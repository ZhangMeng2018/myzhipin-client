import React,{Component} from "react"
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'

class Laoban extends Component {

  render(){
    const {userList} = this.props;
    if(!userList.length) {
      return <div>
        LOADING....
      </div>
    }
    return <div className='contentWarp'>
      <UserList userList={userList}/>
    </div>
  }
}

export default connect(
  state => ({userList:state.userList}),
  {}
)(Laoban)