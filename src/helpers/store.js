import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {rootReducer} from '../services/index';

const loggerMiddleware = createLogger();

const middleware = [
    thunkMiddleware,
    loggerMiddleware,
];

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware),
        // other store enhancers if any
    )
);