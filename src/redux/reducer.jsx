import {combineReducers} from 'redux'

import getRedirectPath from '../utils/getRedirectPath'
import {RETERROR,AUTH_SUCCESS,ERROR_MSG,RESET_USER,RECEIV_EUSER,RECEIVE_USERLIST,USERLIST_ERR} from './action-types'

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

export default combineReducers({userReducer,userList})