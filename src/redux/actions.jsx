import {RETERROR,AUTH_SUCCESS,ERROR_MSG,RECEIV_EUSER,RESET_USER} from './action-types'
import {reqRegister,reqLogin,reqUser,reUpdateUser} from '../api'



const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user});
const errorMsg = (msg) =>({type:ERROR_MSG,data:msg});

const receiveUser = (data) =>({type:RECEIV_EUSER,data:data});
const resetUser = (msg) =>({type:RESET_USER,data:msg});

export function retError(){
  return ({type:RETERROR,data:''});
}

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
    dispatch(authSuccess(result.data))
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
      dispatch(authSuccess(result.data))
    }else {
      dispatch(errorMsg(result.msg))
    }
  }
}

export function updateUser(userInfo) {
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
      dispatch(authSuccess(result.data))
    }else {
      dispatch(errorMsg(result.msg))
    }
  }
}