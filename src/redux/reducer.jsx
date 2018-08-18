import {combineReducers} from 'redux'

import getRedirectPath from '../utils/getRedirectPath'
import {RETERROR,AUTH_SUCCESS,ERROR_MSG,RESET_USER,RECEIV_EUSER,RECEIVE_USERLIST,USERLIST_ERR,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from './action-types'

const userState = {
    username: '',
    type:'',
    errMsg:'',
    redirectTo:''
};
const initUserList = [];
function userReducer(state = userState,action) {
    switch (action.type){
      case AUTH_SUCCESS:
        const user = action.data ;
        return {...action.data,redirectTo:getRedirectPath(user.type,user.header)};
      case ERROR_MSG:
        return {msg:action.data};
      case RECEIV_EUSER:
        const newUser = action.data ;
        return {...action.data,redirectTo:getRedirectPath(newUser.type,newUser.header)};
      case RESET_USER:
        return {msg:action.data};
      case RETERROR:
        return {msg:action.data};
      default:
        return state
    }
}

function userList(state = initUserList,action) {
  switch (action.type) {
    case RECEIVE_USERLIST:
      return action.data;
    case USERLIST_ERR:
      state.msg = action.data;
      return state;
    default:
      return state
  }
}

const initChat = {
   // 所有用户信息对象的对象容器: key是user的_id, value是{username, header}
  chatMsgs: [], // 当前用户相关的所有chatMsg的数组
  unReadCount: 0, // 总的未读数量
};

function chat(state = initChat,action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      var {chatMsgs,meId}=action.data;
      return {
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (msg.to===meId ? msg.unRead : 0),0),
      };
    case RECEIVE_MSG:
      var {chatMsg,meId} = action.data;
      console.log(chatMsg,meId)
      return {
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount+ (chatMsg.to===meId? chatMsg.unRead:0),
      };
    case MSG_READ:
    var {targetId, meId, count} = action.data;
      return {
        chatMsgs:state.chatMsgs.map(msg => {
          if(msg.from === targetId && msg.to === meId ){
            return {...msg,unRead:0}
          }else {
            return msg
          }
        }),
        unReadCount:state.unReadCount - count
      };
    default:
      return state
  }
}


export default combineReducers({userReducer,userList,chat})