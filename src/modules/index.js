import { combineReducers } from 'redux';
import actionReducer from './actionReducer';
import comedyReducer from './comedyReducer';
import romanceReducer from './romanceReducer';
import animationReducer from './animationReducer';
import horrorReducer from './horrorReducer';

const rootReducer = combineReducers({
    action: actionReducer,
    comedy: comedyReducer,
    romance: romanceReducer,
    animation: animationReducer,
    horror: horrorReducer
})

export default rootReducer;