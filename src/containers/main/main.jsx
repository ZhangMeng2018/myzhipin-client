import React,{Component} from "react"
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {Route,Switch,Redirect} from 'react-router-dom'


import {getUser} from "../../redux/actions";
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

class Main extends Component {

    componentDidMount() {
      const userid = Cookies.get('userid');
      const {user} = this.props;
      if (userid && !user._id) {
        this.props.getUser();
      }
    }
    render(){
        const userid = Cookies.get('userid');
        const {redirectTo} = this.props.user;
        if(!userid){
          return <Redirect to='/login'/>
        }

        console.log(this.props.user);
        if(!this.props.user._id){
          return <div>
              LOODING....
          </div>
        }
      if (redirectTo !== this.props.location.pathname) {
        return <Redirect to={redirectTo}/>
      }
        return <div>
                 <Switch>
                     <Route path='/dasheninfo' component={DashenInfo}/>
                     <Route path='/laobaninfo' component={LaobanInfo}/>
                 </Switch>
             </div>
        }


}

export default connect(
  state => ({user:state.userReducer}),
  {getUser}
)(Main)