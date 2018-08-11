import {combineReducers} from 'redux'

xxxState = {
    name: 'tom'
};
yyyState = {
    name: 'jack'
};
function xxx(state = xxxState,action) {

}
function yyy(state = yyyState,action) {

}

export default combineReducers({xxx,yyy})