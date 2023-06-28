import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';

export const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducer,composeEnhacer(applyMiddleware(thunkMiddleware))); // permite hacer peticiones a un servidor


export default store;
