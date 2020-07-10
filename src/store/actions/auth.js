import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = ()=>{
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, userId)=>{
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  }
}

export const authFail = (error)=>{
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email,password, isSignUp)=>{
  return dispatch => {
      dispatch(authStart());
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTHB_mU-8YbRXAchoM4pJLWJGOucOGASE';
      if(!isSignUp){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTHB_mU-8YbRXAchoM4pJLWJGOucOGASE';
      }
      axios.post(url,authData)
        .then((response)=>{
          console.log(response);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch((err)=>{
          console.log(err);
          dispatch(authFail(err))
        })
  }
}