import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData)=>{
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (err)=>{
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err
  }
};

export const purchaseBurgerStart = (orderData)=>{
  return dispatch=>{
    axios.post('/orders.json', orderData)
      .then(response=>{
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  }
}
