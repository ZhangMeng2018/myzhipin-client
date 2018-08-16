import React,{Component} from "react"
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import {updateUser} from  "../../redux/actions";
import HeaderSelector from '../../components/header-selector/header-selector'

class LaobanInfo extends Component{
  state ={
    header: '', // 头像名称
    info: '', // 个人简介
    post: '', // 职位名称
    company: '', // 公司名称
    salary: '' // 工资
  };
  handleChange = (key,val) => this.setState({[key]:val});
  setHeader = (header) => {
    this.setState({header});
  };


  render(){
    const user = this.props.user;
    if(user.header) return <Redirect to = '/laoban'/>;
    return <div>
      <NavBar>老板信息完善</NavBar>
      <HeaderSelector setHeader={this.setHeader}/>
      <InputItem onChange={val => this.handleChange('post', val)}>招聘职位:</InputItem>
      <InputItem onChange={val => this.handleChange('company', val)}>公司名称:</InputItem>
      <InputItem onChange={val => this.handleChange('salary', val)}>职位薪资:</InputItem>
      <TextareaItem title="职位要求:"
                    rows={3}
                    onChange={val => this.handleChange('info', val)}/>

      <Button type='primary' onClick={() => this.props.updateUser(this.state)}>保存</Button>
    </div>
  }
}

export default connect(
  state =>({user:state.userReducer}),
  {updateUser}
)(LaobanInfo)