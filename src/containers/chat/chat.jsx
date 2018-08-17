import React,{Component} from "react"
import {connect} from 'react-redux'
import {NavBar, List, InputItem} from 'antd-mobile'


import {getUserList} from '../../redux/actions'

const Item = List.Item;

class Chat extends Component{

  componentDidMount(){
    if(!this.props.userList.length){
      const type = this.props.user.type === 'laoban'? 'dashen' : 'laoban';
      this.props.getUserList({type});
    }
  }
  render(){
    const {user} = this.props;
    const targetUserId = this.props.match.params.userid;
    if(!this.props.userList.length){
      return <div>
        LOADING...........
      </div>
    }else {
      const targetUser = this.props.userList.filter(target => targetUserId === target._id)[0];
      return (
        <div id='chat-page'>
          <NavBar className='stick-top'
                  icon='返回'
                  onLeftClick={() => this.props.history.goBack()}
          >
                  {`和${targetUser.username}的聊天`}
          </NavBar>
          <List>
            <Item
              thumb={require(`../../components/images/headers/${targetUser.header}.png`)}
            >
              你好
            </Item>
            <Item
              thumb={require(`../../components/images/headers/${targetUser.header}.png`)}
            >
              你好2
            </Item>
            <Item
              className='chat-me'
              extra='我'
            >
              很好
            </Item>
            <Item
              className='chat-me'
              extra='我'
            >
              很好2
            </Item>
          </List>

          <div className='am-tab-bar'>
            <InputItem
              placeholder="请输入"
              extra={
                <span>发送</span>
              }
            />
          </div>
        </div>
      )
    }

  }
}

export default connect(
  state =>({user:state.userReducer,userList:state.userList}),
  {getUserList}
)(Chat)