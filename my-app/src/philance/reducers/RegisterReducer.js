import {
    REG_EMAIL_CHANGED,
    REG_PASSWORD_CHANGED,
    REG_FIRST_NAME_CHANGED,
    REG_LAST_NAME_CHANGED,
    FIELDS_EMPTY
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: 'GET STARTED'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case REG_EMAIL_CHANGED: 
            return {...state, email: action.payload, error: 'GET STARTED'}
        case REG_PASSWORD_CHANGED:
            return{...state, password: action.payload, error: 'GET STARTED'}
        case REG_FIRST_NAME_CHANGED:
            return{...state, firstName: action.payload, error: 'GET STARTED'}
        case REG_LAST_NAME_CHANGED:
            return{...state, lastName: action.payload, error: 'GET STARTED'}
        case FIELDS_EMPTY:
            return {...state, error: 'ALL THE FIELDS ARE REQUIRED TO BE FILLED'}
        default:
        return state
    }
}