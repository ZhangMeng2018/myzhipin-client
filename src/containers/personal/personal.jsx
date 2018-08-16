import React,{Component} from "react"
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component {


  handleLogout = () =>{
    Modal.alert('退出', '确认退出登录吗?', [
      {
        text: '取消',
        onPress: () => console.log('cancel')
      },
      {
        text: '确认',
        onPress: () => {
          // 清除cookie中的userid
          Cookies.remove('userid');
          // 重置redux中的user状态
          this.props.resetUser();
          this.props.history.replace('/login')
        }
      }
    ])
  };

  render(){
    const {username, header, post, info, salary, company,type} = this.props.user;
    return  <div className='contentWarp'>
              <Result
                img={<img src={require(`../../components/images/headers/${header}.png`)} style={{width: 50}} alt="header"/>}
                title={username}
                message={company}
              />

              <List renderHeader={() => '相关信息'}>
                <Item multipleLine>
                  <Brief>{type==='laoban'?'招聘':null}职位: {post}</Brief>
                  <Brief>{type==='laoban'?'岗位要求':'简介'}: {info}</Brief>
                  {salary ? <Brief>薪资: {salary}</Brief> : null}
                </Item>
              </List>
              <WhiteSpace/>
              <List>
                <Button type='warning' onClick={this.handleLogout}>退出登录</Button>
              </List>
            </div>

  }
}

export default connect(
  state => ({user:state.userReducer}),
  {resetUser}
)(Personal)