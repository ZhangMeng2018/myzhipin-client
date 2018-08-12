import React,{Component} from "react"
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'

import Logo from '../../components/logo/logo'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  };
  handelChange = (key,val) =>{
    this.setState({
      [key]:val
    })
  };
  login = () =>{
    console.log(this.state)
  };
  toRegister = () =>{
    this.props.history.replace('/register')
  };
  render(){
    return <div>
        <NavBar>张萌直聘</NavBar>
        <Logo />
        <WingBlank>
            <List>
                <InputItem  placeholder='请输入用户名' onChange={val => this.handelChange('username',val)}>用户名:</InputItem>
                <WhiteSpace/>
                <InputItem  placeholder='请输入密码' onChange={val => this.handelChange('password',val)}>密码:</InputItem>
            </List>
        </WingBlank>
        <br/>
        <WingBlank>
            <List>
                <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆</Button>
                <WhiteSpace/>
                <Button onClick={this.toRegister}>没有账户</Button>
            </List>
        </WingBlank>
    </div>
  }
}