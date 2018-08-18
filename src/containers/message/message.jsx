import React,{Component} from "react"
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {

  getLastMsgs = (chatMsgs,meId) =>{
        const lastMsgsWarp = {};
        chatMsgs.forEach((msg)=>{

            const chatId = msg.chat_id;
            const lastMsg = lastMsgsWarp[chatId];
            if(!lastMsg){
              lastMsgsWarp[chatId] = msg;
              lastMsgsWarp[chatId].unReadCount = 0 ;
            }else {
              let unReadCount = lastMsg.unReadCount;
              if( msg.to === meId){
                unReadCount = msg.unRead + lastMsg.unReadCount;
              }
              if(msg.create_time>lastMsg.create_time) {
                lastMsgsWarp[chatId] = msg
              }
              lastMsgsWarp[chatId].unReadCount = unReadCount;
            }
        });
    const lastMsgs = Object.values(lastMsgsWarp);
    lastMsgs.sort((msg1, msg2) => { // 如果结果大于0, 后面的排到前面去
      return msg1.create_time < msg2.create_time  // 降序
      // return msg1.create_time - msg2.create_time // 升序
    });
    return lastMsgs
  };
  render(){
    const {meId,chatMsgs,userList} =this.props;
    const lastMsgs = this.getLastMsgs(chatMsgs,meId);
    return  (
      <List style={{marginTop: 50}}>
      {
        lastMsgs.map(msg => {
          // 得到目标用户的id
          const targetId =  meId===msg.from ? msg.to : msg.from;
          // 得到目标用户的信息
          const targetUser = userList.filter(target => targetId === target._id)[0];
          return (
            <Item
              key={msg._id}
              extra={<Badge text={msg.unReadCount}/>}
              thumb={require(`../../components/images/headers/${targetUser.header}.png`)}
              arrow='horizontal'
              onClick={() => this.props.history.push(`/chat/${targetId}`)}
            >
              {msg.content}
              <Brief>{targetUser.username}</Brief>
            </Item>
          )
        })
      }
    </List>)
  }
}

export default connect(
  state => ({meId:state.userReducer._id,userList:state.userList,chatMsgs:state.chat.chatMsgs}),
  {}
)(Message)