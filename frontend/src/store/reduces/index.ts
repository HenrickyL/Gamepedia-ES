import {IReducerReturn } from '../../typings/Interfaces';
import {combineReducers} from 'redux'
import authReducer from './authenticationReducer'
import uiReducer from './uiReducer'


export default combineReducers<IReducerReturn>({
    auth: authReducer,
    ui:uiReducer
})
