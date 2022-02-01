import {
    IAuthReturn,
    IAction
} from '../../typings/Interfaces'
import {
    auth as ActionsEnum
} from '../../typings/Enums'


const INITIAL_STATE:IAuthReturn = {
    authenticated: localStorage.getItem('token')!=null,
    user: null
}


export default function reducerAuth(
    state:IAuthReturn = INITIAL_STATE, 
    action:IAction):IAuthReturn{
        switch (action.type) {
            case ActionsEnum.LOGIN_SUCCESS:
                return{
                    ...state,
                    authenticated: true,
                    user: action.user
                };
            case ActionsEnum.LOGIN_FAIL:
                return INITIAL_STATE;
        
            default:
                return state;
        }
}


