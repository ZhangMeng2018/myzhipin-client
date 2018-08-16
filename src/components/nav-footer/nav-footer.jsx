import React,{Component} from "react"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item;

class NavFooter extends Component {
  static propTypes = {
    navList:PropTypes.array.isRequired
  };
  render(){
    const navList = this.props.navList.filter(nav => !nav.hide);
    const {pathname} = this.props.location;
    return <div className='footerWarp'>
              <TabBar>
                {
                  navList.map((nav, index) => (
                    <Item key={nav.path}
                          title={nav.text}
                          icon={{uri: require(`../images/nav/${nav.icon}.png`)}}
                          selectedIcon={{uri: require(`../images/nav/${nav.icon}-selected.png`)}}
                          selected={pathname === nav.path}
                          onPress={() => {
                            this.props.history.replace(nav.path)
                          }}
                    />
                  ))
                }
              </TabBar>
          </div>
  }
}

export default withRouter(NavFooter)