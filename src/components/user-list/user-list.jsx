import React,{Component} from "react"
import PropTypes from 'prop-types'
import {WingBlank,Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Header = Card.Header;
const Body = Card.Body;


class UserList extends Component {
  static propTypes = {
    userList:PropTypes.array.isRequired
  };
  render(){
    const {userList} = this.props;
    if(userList.msg){
      return <div>
        {userList.msg}
      </div>
    }
    return <WingBlank>

        {userList.map(user => (
          <div key={user._id}>
            <Card onClick = {()=>(this.props.history.push(`/chat/${user._id}`))}>
              <Header
                thumb={user.header ? require(`../../components/images/headers/${user.header}.png`) : null}
                extra={user.username}
              />
              <Body>
                <div>{user.type==='laoban'?'招聘':null}职位: {user.post}</div>
                {user.company ? <div>公司: {user.company}</div> : null}
                {user.salary ? <div>月薪: {user.salary}</div> : null}
                <div>描述: {user.info}</div>
              </Body>
            </Card>
            <br/>
          </div>
        ))}
    </WingBlank>
  }
}

export default withRouter(UserList)