import React from 'react';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {

  checkoutCancelledHandler = ()=>{
    this.props.history.goBack();
  }
  checkoutContinuedHandler = ()=>{
    this.props.history.replace('/checkout/contact-data');
  }

  componentWillMount(){
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // let price=0;
    // for(let param of query.entries()){
    //   if(param[0]==='price'){
    //     price = param[1];
    //     continue;
    //   }
    //   ingredients[param[0]]=+param[1]
    // }
    // this.setState({ingredients: ingredients, totalPrice: price});
  }

  render(){
    return (
      <div>
        <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued= {this.checkoutContinuedHandler} />
        {/*<Route path={this.props.match.path+'/contact-data'}
            render={(props)=>(<ContactData ingredients={this.props.ings} price={this.state.totalPrice} {...props}/>)} />*/}
            <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
