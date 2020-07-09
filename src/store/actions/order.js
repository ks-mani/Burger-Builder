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

export const purchaseBurgerStart = ()=>{
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData)=>{
  return dispatch=>{
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', orderData)
      .then(response=>{
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  }
}

export const purchaseInit = ()=>{
  return {
    type: actionTypes.PURCHASE_INIT
  }
}


export const fetchOrdersSuccess = (orders)=>{
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error)=>{
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error
  }
}

export const fetchOrdersStart = ()=>{
  return {
    type: actionTypes.FETCH_ORDER_START
  }
}

export const fetchOrders = ()=>{
  return dispatch =>{
    // dispatch(fetchOrdersStart())
    axios.get('/orders.json')
      .then(res=>{
        const fetchedOrders = [];
        for(let key in res.data){
          fetchedOrders.push({
            id: key,
            ...res.data[key]
          })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
        // this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(err=>{
        dispatch(fetchOrdersFail(err))
        // this.setState({loading: false});
      })
  }
}
