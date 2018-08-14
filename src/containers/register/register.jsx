import React,{Component} from "react"
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register,retError} from '../../redux/actions'

class Register extends Component {
    state = {
        username: '',
        password: '',
        rePassword: '',
        type: 'dashen'
    };
    handelChange = (key,val) =>{
        this.setState({
        [key]:val
        })
    };
    register = () =>{
      this.props.register(this.state)
    };
    toLogin = () =>{
        this.props.retError();
        this.props.history.replace('/login')
    };
    render(){
         const {redirectTo, msg} = this.props.user;
         if (redirectTo) {
         return <Redirect to={redirectTo}/>
         }
        return <div>
            <NavBar>直聘</NavBar>
            <Logo />
            <WingBlank>
                <List>
                    {msg?<List.Item>
                      <p className='errorMsg'>{msg}</p>
                    </List.Item>:''
                    }
                    <InputItem  placeholder='请输入用户名' onChange={val => this.handelChange('username',val)}>用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem  placeholder='请输入密码' onChange={val => this.handelChange('password',val)}>密码:</InputItem>
                    <WhiteSpace/>
                    <InputItem  placeholder='请确认密码' onChange={val => this.handelChange('rePassword',val)}>确认密码:</InputItem>
                    <List.Item>
                        <span>用户类型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <Radio checked={this.state.type === 'dashen'} onChange={() => this.handelChange('type','dashen')}>
                            大神
                        </Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={this.state.type === 'laoban'} onChange={() => this.handelChange('type','laoban')}>
                            老板
                        </Radio>
                    </List.Item>
                </List>
            </WingBlank>
            <br/>
            <WingBlank>
                <List>
                    <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
                </List>
                <br/>
                <List>
                    <Button onClick={this.toLogin}>已有账户</Button>
                </List>
            </WingBlank>
        </div>
    }
}

export default connect(
  state => ({user:state.userReducer})
  ,{register,retError}
)(Register)