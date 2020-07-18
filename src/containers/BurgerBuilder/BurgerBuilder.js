import React, {Component, useState, useEffect} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

import axios from '../../axios-order';


const BurgerBuilder=(props)=>{

  const[purchasing, setPurchasing]=useState(false);

  useEffect(()=>{
    props.onInitIngredients();
  }, []);


  function updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
          .map(igKey=>{
            return ingredients[igKey];
          })
          .reduce((sum,el)=>{
            return sum+el;
          },0);
    return sum>0;
  }

  const addIngredientHandler = (type)=>{
    // const oldCount = this.state.ingredients[type];
    // const updatedCount = oldCount+1;
    // const updatedIngredients = {
    //   ...this.state.ingredients
    // }
    // updatedIngredients[type]=updatedCount;
    // const priceAddition = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice + priceAddition;
    // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    // this.updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = (type)=>{
    // const oldCount = this.state.ingredients[type];
    // if(oldCount<=0) return;
    // const updatedCount = oldCount-1;
    // const updatedIngredients = {
    //   ...this.state.ingredients
    // }
    // updatedIngredients[type]=updatedCount;
    // const priceDeduction = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice - priceDeduction;
    // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    // this.updatePurchaseState(updatedIngredients);
  };

  const purchaseHandler=()=>{
    if(props.isAuthenticated){
        setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler=()=>{
    setPurchasing(false);
  }

  const purchaseContinueHandler=()=>{
    // const queryParams = [];
    // for(let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price='+this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // props.history.push({
    //   pathname: '/checkout',
    //   search: '?'+queryString
    // });
    props.onInitPurchase();
    props.history.push('/checkout');

  };

  const disabledInfo = {
    ...props.ings
  };

  for(let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key]<=0;
  }
  let orderSummary = null;

  let burger = props.error? <p>Ingredients can't be loaded</p>:<Spinner />

  if(props.ings){
    burger = (
      <Aux>
        <Burger ingredients={props.ings}/>
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled = {disabledInfo}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          price={props.price}
          isAuth={props.isAuthenticated}
          />
      </Aux>
    );
    orderSummary = <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}/>;
  }

  {/*if(this.state.loading){
    orderSummary = <Spinner />;
  }*/}

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

const mapStateToProps = (state)=>{
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token!==null
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onIngredientAdded: (ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: ()=>dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: ()=>dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
