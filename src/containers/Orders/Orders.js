import React from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
      orders: [],
      loading: true
  }

  componentDidMount(){
    axios.get('/orders.json')
      .then(res=>{
        const fetchedOrders = [];
        for(let key in res.data){
          fetchedOrders.push({
            id: key,
            ...res.data[key]
          })
        }
        this.setState({loading: false, order: fetchedOrders});
      })
      .catch(err=>{
        this.setState({loading: false});
      })
  }

  render(){
    return (
      <div>
        <Order />
        <Order />
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios);
