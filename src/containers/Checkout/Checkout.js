import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
// import * as actions from '../../store/actions/index';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = (props)=>{

  const checkoutCancelledHandler = ()=>{
    props.history.goBack();
  }
  const checkoutContinuedHandler = ()=>{
    props.history.replace('/checkout/contact-data');
  }

  let summary = <Redirect to="/" />;
  if(props.ings){
      const purchasedRedirect = props.purchased?<Redirect to="/" />:null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
           ingredients={props.ings}
           onCheckoutCancelled={checkoutCancelledHandler}
           onCheckoutContinued= {checkoutContinuedHandler} />
           {/*<Route path={props.match.path+'/contact-data'}
               render={(props)=>(<ContactData ingredients={props.ings} price={this.state.totalPrice} {...props}/>)} />*/}
            <Route path={props.match.path+'/contact-data'} component={ContactData}/>
        </div>
      )
  }
  return summary

}

const mapStateToProps = (state)=>{
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}
// const mapDispatchToProps = (dispatch)=>{
//   return {
//     onInitPurchase: ()=>dispatch(actions.purchaseInit())
//   }
// }

export default connect(mapStateToProps)(Checkout);
