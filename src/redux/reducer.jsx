import {combineReducers} from 'redux'

import getRedirectPath from '../utils/getRedirectPath'
import {RETERROR,AUTH_SUCCESS,ERROR_MSG,RESET_USER,RECEIV_EUSER} from './action-types'

const userState = {
    username: '',
    type:'',
    errMsg:'',
    redirectTo:''
};
function userReducer(state = userState,action) {
    switch (action.type){
      case AUTH_SUCCESS:
        const user = action.data ;
        console.log(user.header);
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

function xxxReducer(state = userState,action) {
  return  {}
}


export default combineReducers({userReducer,xxxReducer})