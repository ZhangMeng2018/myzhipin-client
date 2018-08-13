import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'

const userState = {
    username: '',
    type:'',
    errMsg:'',
    redirectTo:''
};
function userReducer(state = userState,action) {
    switch (action.type){
      case AUTH_SUCCESS:
        return {...action.data,redirectTo:'/'};
      case ERROR_MSG:
        return {msg:action.data};
      default:
        return state
    }
}

function xxxReducer(state = userState,action) {
  return  {}
}


export default combineReducers({userReducer,xxxReducer})