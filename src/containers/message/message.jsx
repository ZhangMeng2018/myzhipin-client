import React,{Component} from "react"
import {connect} from 'react-redux'

class Message extends Component {
  render(){
    return <div>
      大神！！！
    </div>
  }
}

export default connect(
  state => ({}),
  {}
)(Message)