import React from 'react'
import * as action from '../../../store/actions/index';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


class Logout extends React.Component {
  componentDidMount(){
    this.props.onLogout();

  }
  render(){
    return <Redirect to="" />
  }
}

const mapDispatchToPros = dispatch=>{
  return {
    onLogout: ()=>dispatch(action.logout())
  }
}

export default connect(null,mapDispatchToPros)(Logout)
