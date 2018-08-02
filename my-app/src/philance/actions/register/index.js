import {
    REG_EMAIL_CHANGED,
    REG_PASSWORD_CHANGED,
    REGISTER_USER,
    FIELDS_EMPTY,
    REG_FIRST_NAME_CHANGED,
    REG_LAST_NAME_CHANGED,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
} from '../types'

import axios from 'axios'

export const firstNameChanged = text => {
    return {
        type: REG_FIRST_NAME_CHANGED,
        payload: text
    }
}

export const lastNameChanged = text => {
    return {
        type: REG_LAST_NAME_CHANGED,
        payload: text
    }
}

export const emailChanged = text => {
    return {
        type: REG_EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = text => {
    return {
        type: REG_PASSWORD_CHANGED,
        payload: text
    }
}

export const textChanged = () => {
    return {
        type: REGISTER_USER
    }
}

export const registerUser = ({ firstName, lastName, email, password }) => {
    if(email === '' || password === '' || firstName == '' || lastName == '' ) 
        return {
            type: FIELDS_EMPTY
        }
    return dispatch => {
        dispatch({type: REGISTER_USER})
        console.log('email is', email)
        console.log('password is', password)
        axios.post('http://localhost:3001/philance/users/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
        .then(response=>console.log(response))
        .catch(error=>{
        console.log(error);
        });
    }
}

const registerUserSuccess = (dispatch, response) => {
    dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response
    })
}

const registerUserFail = (dispatch, response) => {
    dispatch({type: REGISTER_USER_FAIL})
}
