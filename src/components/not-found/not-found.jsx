import React,{Component} from "react"
import {connect} from 'react-redux'

export default class NotFound extends Component {
  render(){
    return <div className='errorPath'>
      <p>
        您访问的路径不存在 ！！！
      </p>
    </div>
  }
}

