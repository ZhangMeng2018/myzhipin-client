import React,{Component} from "react"
import './logo.less'
import logoImg from '../images/logo/logo.png'

export default class Logo extends Component {
    render(){
        return <div className='logo-warp'>
            <img src={logoImg} alt="logo"/>
        </div>
    }
}