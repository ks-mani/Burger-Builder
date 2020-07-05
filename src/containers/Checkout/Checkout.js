import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 0,
      bacon: 2
    }
  }

  checkoutCancelledHandler = ()=>{
    this.props.history.goBack();
  }
  checkoutContinuedHandler = ()=>{
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    return (
      <div>
        <CheckoutSummary
            ingredients={this.state.ingredients}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued= {this.checkoutContinuedHandler} />
      </div>
    )
  }
}


export default Checkout;
