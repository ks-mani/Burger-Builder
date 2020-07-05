import React from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends React.Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event)=>{
    event.preventDefault();
    // alert("You continue");
    this.setState({loading: true})
    const orderObject = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Mani",
        address: {
          street: 'Teststreet 1',
          zipCode: '123211',
          country: 'sdfsdf'
        },
        email: 'abc@xyz.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', orderObject)
      .then(response=>{
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
    console.log(this.props.ingredients);
  }

  render(){
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if(this.state.loading){
      form=<Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }

}

export default ContactData;
