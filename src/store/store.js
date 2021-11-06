import { createStore, combineReducers } from 'redux';
import darkModeContextReducer from '../reducers/appReducer';

export default createStore(combineReducers({
    darkModeContext: darkModeContextReducer
}));