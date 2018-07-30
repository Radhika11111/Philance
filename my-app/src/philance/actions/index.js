import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types'

export const emailChanged = text => {
    console.log(text)
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = text => {
    console.log(text)
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({email, password}) => {
    return dispatch => {
        dispatch({type: LOGIN_USER})
        console.log('email is', email)
        console.log('password is', password)
        fetch('http://127.0.0.1:3001/philance/users/login', {
            method: 'post',
            headers: {
                'message': 'application/json',
                'token': 'application/json'
            },
            body: JSON.stringify({
                     email: email,
                     password: password
                   })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
        });
    }
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
}

const loginUserFail = (dispatch, user) => {
    dispatch({type: LOGIN_USER_FAIL})
}
