import io from 'socket.io-client'
import {RETERROR,
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIV_EUSER,
  RESET_USER,
  RECEIVE_USERLIST,
  USERLIST_ERR,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from './action-types'
import {reqRegister,reqLogin,reqUser,reUpdateUser,reqUserList,reqChatMsgList,reqReadMsg} from '../api'



const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user});
const errorMsg = (msg) =>({type:ERROR_MSG,data:msg});

const receiveUser = (data) =>({type:RECEIV_EUSER,data:data});

const receiveUserList = (userList) =>({type:RECEIVE_USERLIST,data:userList});
const userlistErr = (msg) =>({type:USERLIST_ERR,data:msg});

export const resetUser = (msg) =>({type:RESET_USER,data:msg});

export const retError = () => ({type:RETERROR,data:''});

// 接收消息列表的同步action
const receiveMsgList = ({chatMsgs,meId}) => ({type: RECEIVE_MSG_LIST, data: {chatMsgs,meId}});
// 接收消息的同步action
const receiveMsg = (chatMsg,meId) => ({type: RECEIVE_MSG, data: {chatMsg,meId}});
// 读取了消息的同步action
const msgRead = (targetId, meId, count) => ({type: MSG_READ, data: {targetId, meId, count}});

export function register({username, password,rePassword, type}) {
  if(!username){
    return errorMsg('用户名不能为空')
  }else if(!password){
    return errorMsg('密码不能为空')
  }else if(rePassword !== password){
    return errorMsg('两次密码不一致')
  }else if(!type){
    return errorMsg('请选择用户类型')
  }
  return async dispatch => {
  const res = await reqRegister({username, password, type});
  const result = res.data;
  if(!result.code){
    dispatch(authSuccess(result.data));
    const {_id} = result.data;
    getUserList(type === 'laoban'?'dashen':'laoban',dispatch);
    initIO(dispatch, _id);
  }else {
    dispatch(errorMsg(result.msg))
  }
  }
}

export function login({username, password}) {
  if(!username){
    return errorMsg('用户名不能为空')
  }else if(!password){
    return errorMsg('密码不能为空')
  }
  return async dispatch => {
    const res = await reqLogin({username, password});
    const result = res.data;
    if(!result.code){
      let type = result.data.type;
      const {_id} = result.data;
      getUserList(type === 'laoban'?'dashen':'laoban',dispatch);
      initIO(dispatch, _id);
      dispatch(authSuccess(result.data));
    }else {
      dispatch(errorMsg(result.msg))
    }
  }
}

export function updateUser(userInfo) {
  if(!userInfo.header){
    return resetUser('请选择头像')
  }
  return async dispatch =>{
    const res = await reUpdateUser(userInfo);
    const result = res.data;
    if(result.code){
      dispatch(resetUser(result.msg))
    }else {
      dispatch(receiveUser(result.data))
    }
  }
}



export function getUser() {
  return async dispatch => {
    const res = await reqUser();
    const result = res.data;
    if(!result.code){
      dispatch(authSuccess(result.data));
      let type = result.data.type;
      const {_id} = result.data;
      getUserList(type === 'laoban'?'dashen':'laoban',dispatch);
      initIO(dispatch, _id);
    }else {
      dispatch(errorMsg(result.msg))
    }
  }
}


async function getUserList(type,dispatch,userid) {
    const res = await reqUserList({type});
    const result = res.data;
    if(!result.code){
      const userList = result.data.filter(user => user.header);
      dispatch(receiveUserList(userList));
      getMsgList(dispatch,userid)
    }else {
      dispatch(userlistErr(result.msg))
    }

}

/*
获取当前用户相关的所有聊天消息列表
(在注册/登陆/获取用户信息成功后调用)
 */
async function getMsgList(dispatch,meId) {
  const response = await reqChatMsgList();
  const result = response.data;
  if(result.code===0) {
    const chatMsgs = result.data;
    dispatch(receiveMsgList({chatMsgs,meId}))
  }
}

export const sendMsg = ({from, to, content}) => {
  return  dispatch => {
     io.socket.emit('sendMessage', {from, to, content})
  }
};

export const readMsg = (from, to) => {
  return async dispatch => {
    const res = await reqReadMsg({from});
    const result = res.data;
    if(result.code===0) {
      const count = result.data;
      dispatch(msgRead(from,to,count))
    }
  }
};

function initIO(dispatch, meId) {
  io.meId = meId;
  if(!io.socket) {
    io.socket = io('ws://localhost:3000');
    io.socket.on('receiveMessage', (chatMsg) => {
      if(chatMsg.from=== io.meId || chatMsg.to=== io.meId) {
        dispatch(receiveMsg(chatMsg,io.meId))
      }
    })
  }
}

