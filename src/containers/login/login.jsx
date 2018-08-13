import React,{Component} from "react"
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component {
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
    this.props.login(this.state)
  };
  toRegister = () =>{
    this.props.history.replace('/register')
  };
  render(){
    const {redirectTo,msg} = this.props;
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return <div>
        <NavBar>直聘</NavBar>
        <Logo />
        <WingBlank>
            <List>
                {msg?<List.Item>
                  {msg}
                </List.Item>:''
                }
                <InputItem  placeholder='请输入用户名' onChange={val => this.handelChange('username',val)}>用户名:</InputItem>
                <WhiteSpace/>
                <InputItem  placeholder='请输入密码' onChange={val => this.handelChange('password',val)}>密码:</InputItem>
            </List>
        </WingBlank>
        <br/>
        <WingBlank>
            <List>
                <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆</Button>
            </List>
            <br/>
            <List>
                <Button onClick={this.toRegister}>没有账户</Button>
            </List>
        </WingBlank>
    </div>
  }
}

export default connect(
  state => state.userReducer,
  {login}
)(Login)