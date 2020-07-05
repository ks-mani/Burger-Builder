import React from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {

  state = {
    orderForm : {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder:'Your Name'
        },
        value: '',
        validation: {
          required: true
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder:'Street'
        },
        value: '',
        validation: {
          required: true
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder:'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder:'Country'
        },
        value: '',
        validation: {
          required: false
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder:'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        }
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (event)=>{
    event.preventDefault();
    // alert("You continue");
    this.setState({loading: true})
    const formData = {};

    for(let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
    }

    const orderObject = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', orderObject)
      .then(response=>{
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
    // console.log(this.props.ingredients);
  }

  inputChangedHandler = (event, inputIdentifier)=>{
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement={...updatedOrderForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.validity = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    console.log(updatedFormElement);
    this.setState({orderForm: updatedOrderForm})
  }

  checkValidity(value, rules){
    let isValid = false;
    if(rules.required){
      isValid = value.trim()!=='';
    }
    if(rules.minLength){
      isValid = value.length>=rules.minLength;
    }
    if(rules.maxLength){
      isValid = value.length<=rules.maxLength;
    }
    return isValid;
  }

  render(){
    const formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.inputChangedHandler(event, formElement.id)}/>
        ))}
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
