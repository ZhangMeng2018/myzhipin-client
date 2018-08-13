import {AUTH_SUCCESS,ERROR_MSG} from './action-types'
import {reqRegister,reqLogin} from '../api'

const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user});
const errorMsg = (msg) =>({type:ERROR_MSG,data:msg});

export function register({username, password, type}) {
  return dispatch => {
    reqRegister({username, password, type}).then((res =>{
        const result = res.data;
        if(!result.code){
          dispatch(authSuccess(result.data))
        }else {
          dispatch(errorMsg(result.msg))
        }
    }))
  }
}

export function login({username, password}) {
  return dispatch => {
    reqLogin({username, password}).then((res =>{
      const result = res.data;
      if(!result.code){
        dispatch(authSuccess(result.data))
      }else {
        dispatch(errorMsg(result.msg))
      }
    }))
  }
}