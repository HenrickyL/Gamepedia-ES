import {ui as ActionsEnum} from '../../typings/Enums'
import {
    IUIAction,
    IUIReturn
}from '../../typings/Interfaces'


const INITIAL_STATE_UI:IUIReturn = {
    loading: false,
    error: false,
    redirect: false,
    success: false
}

export default function reducerAuth(
    state:IUIReturn = INITIAL_STATE_UI, 
    action:IUIAction):IUIReturn{
        switch (action.type) {
            case ActionsEnum.SET_ERRORS:
                return {
                    ...state,
                    error: true
                };
            case ActionsEnum.CLEAR_ERRORS:
                return {
                    ...state,
                    error: false
                };
            case ActionsEnum.SET_LOADING:
                return {
                    ...state,
                    loading: true
                }
            case ActionsEnum.CLEAR_LOADING:
                return {
                    ...state,
                    loading: false
                }
            case ActionsEnum.SET_REDIRECT:
                return{
                    ...state,
                    redirect: true
                }
            case ActionsEnum.CLEAR_REDIRECT:
                return{
                    ...state,
                    redirect: false
                }
            case ActionsEnum.SET_SUCCESS:
                return{
                    ...state,
                    success: true
                }
            case ActionsEnum.CLEAR_SUCCESS:
                return{
                    ...state,
                    success: false
                }
            default:
               return state;
        }

    }