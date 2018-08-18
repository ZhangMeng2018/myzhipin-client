import React,{Component} from "react"
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {Route,Switch,Redirect} from 'react-router-dom'
import {NavBar}  from 'antd-mobile'


import {getUser} from "../../redux/actions";
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal';
import Chat from '../chat/chat';
import NavFooter from '../../components/nav-footer/nav-footer'
import NotFound from '../../components/not-found/not-found'

class Main extends Component {
    navList = [
      {
        path: '/laoban', // 路由路径
        component: Laoban,
        title: '大神列表',
        icon: 'dashen',
        text: '大神',
      },
      {
        path: '/dashen', // 路由路径
        component: Dashen,
        title: '老板列表',
        icon: 'laoban',
        text: '老板',
      },
      {
        path: '/message', // 路由路径
        component: Message,
        title: '消息列表',
        icon: 'message',
        text: '消息',
      },
      {
        path: '/personal', // 路由路径
        component: Personal,
        title: '用户中心',
        icon: 'personal',
        text: '个人',
      }
    ];
    componentDidMount() {
      const userid = Cookies.get('userid');
      const {user} = this.props;
      if (userid && !user._id) {
        this.props.getUser();
      }
      console.log(this.props.unReadCount)
    }
    render(){
        const userid = Cookies.get('userid');
        const {redirectTo,type,_id} = this.props.user;
        const pathname = this.props.location.pathname;
        if(!userid){
          return <Redirect to='/login'/>
        }

        if(!_id){
          return <div>
              LOODING....
          </div>
        }
        const directPath = type === 'dashen' ? '/laoban' : '/dashen';
        if (pathname === '/'|| pathname === directPath) {
        return <Redirect to={redirectTo}/>
        }
        if (type === 'laoban') {
          this.navList[1].hide = true
        } else {
          this.navList[0].hide = true
        }
        const currentNav = this.navList.find(nav => nav.path === pathname);
        return <div>
                 {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
                 <Switch>
                     <Route path='/laobaninfo' component={LaobanInfo}/>
                     <Route path='/dasheninfo' component={DashenInfo}/>

                     <Route path='/dashen' component={Dashen}/>
                     <Route path='/laoban' component={Laoban}/>
                     <Route path='/message' component={Message}/>
                     <Route path='/personal' component={Personal}/>

                     <Route path='/chat/:userid' component={Chat}/>

                     <Route component={NotFound}/>

                 </Switch>
                {currentNav ? <NavFooter unReadCount={this.props.unReadCount} navList={this.navList}/> : null}
             </div>
        }
}

export default connect(
  state => ({user:state.userReducer,unReadCount:state.chat.unReadCount}),
  {getUser}
)(Main)