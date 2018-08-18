import React,{Component} from "react"
import {connect} from 'react-redux'
import {NavBar, List, InputItem,Grid} from 'antd-mobile'

import {sendMsg,readMsg} from '../../redux/actions'


const Item = List.Item;

class Chat extends Component{

  state = {
    content: '',
    isShow: false, // 是否显示表情列表
  };


  // 在第一次render()之前调用
  componentWillMount () {
    const emojisStr = '❤ ❤ ❤ ❤ ❤ 😊 😊 😊 😊 😀 😁 😂 😄 😆 😊 😀 😁 😂 ❤ ❤ ❤ ❤ ❤ 😊 😊 😊 😊 😀 😁 😂 😄 😆 😊 😀 😁 😂 ❤ ❤ ❤ ❤ ❤ 😊 😊 😊 😊 😀 😁 😂 😄 😆 😊 😀 😁 😂';
    this.emojis = [];
    emojisStr.split(' ').forEach(emoji => {
      this.emojis.push({
        text: emoji
      })
    })
  }
  componentWillUnmount(){
    const meId = this.props.user._id;
    const targetId = this.props.match.params.userid;
    this.props.readMsg(targetId,meId);
  }

  send = (from,to) => {

    // 内容
    const {content} = this.state;

    if(!content.trim()) {
      return
    }
    this.props.sendMsg({ from, to,content});
    // 清空输入
    this.setState({content: '', isShow: false})
  };

  // 初始化显示滚动到底部
  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  // 更新显示时滚动到底部
  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  toggleEmojis = () => {
    const isShow = !this.state.isShow;
    this.setState({isShow});
    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  };

  render(){
    const {user} = this.props;
    const targetId = this.props.match.params.userid;
    if(!this.props.userList.length){
      return <div>
        LOADING...........
      </div>
    }else {
      const meId = user._id;
      const chatId = [meId, targetId].sort().join('_') ;// 当前聊天的ID
      const {chatMsgs} = this.props.chat;
      const msgs = chatMsgs.filter(msg => msg.chat_id===chatId);
      const targetUser = this.props.userList.filter(target => targetId === target._id)[0];
      const targetIcon =require(`../../components/images/headers/${targetUser.header}.png`);
      return (
        <div id='chat-page'>
          <NavBar className='stick-top'
                  icon='返回'
                  onLeftClick={() => this.props.history.goBack()}
          >
                  {`和${targetUser.username}的聊天`}
          </NavBar>
          <List style={{marginBottom:50,marginTop:50}}>
            {msgs.map(msg=> {
              if (msg.to === meId) { // 别人发给我的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              } else { // 我发给别人的
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>)
              }
            } )
          }
          </List>
          <div className='am-tab-bar'>
            <InputItem
              placeholder="请输入"
              onChange={val => {this.setState({content: val})}}
              onFocus={() => this.setState({isShow: false})}
              value={this.state.content}
              extra={
                <span>
                <span onClick={this.toggleEmojis}>❤</span>
                <span onClick={()=>this.send(meId,targetId)}>发送</span>
              </span>
              }
            />
            {
              this.state.isShow
                ? (
                  <Grid
                    data={this.emojis}
                    columnNum={8}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item) => {
                      this.setState({content: this.state.content + item.text})
                    }}
                  />
                )
                : null
            }

          </div>
        </div>
      )
    }
  }
}

export default connect(
  state =>({user:state.userReducer,userList:state.userList,chat:state.chat}),
  {sendMsg,readMsg}
)(Chat)