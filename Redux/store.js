import {createStore , applyMiddleware} from 'redux';
import labelsReducer from './labels/label-reducer'
import thunk from 'redux-thunk'



const middlewares = [thunk]


export const store = createStore(labelsReducer , applyMiddleware(...middlewares))

