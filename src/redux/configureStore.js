import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Leaders} from './leaders';
import {Promotions} from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { InitialFeedback } from './form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}