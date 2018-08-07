import axios from 'axios'
import {
    createStore,
    applyMiddleware
} from 'redux'
import Immutable from 'immutable'
import rootReducer  from '../reducers'


function createAxiosAuthMiddleware() {
    return ({ getState }) => next => (action) => {
        const token = getState().accessToken;
        axios.defaults.headers.common['accessToken'] = token ? token : null;

        return next(action);
    };
}

const axiosAuth = createAxiosAuthMiddleware();


const initialState = Immutable.fromJS({})

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(axiosAuth)
)

export default store