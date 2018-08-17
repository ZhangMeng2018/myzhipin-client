import React,{Component} from "react"
import {connect} from 'react-redux'

class Message extends Component {
  render(){
    return  <div className='errorPath'>
      <p>
        这个页面还没写好呢 ！！！
      </p>
    </div>
  }
}

export default connect(
  state => ({}),
  {}
)(Message)