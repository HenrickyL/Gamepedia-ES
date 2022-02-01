import {
    ILoginRequest,
    IRegisterRequest,
    IAuthAction, 
    IHttpResponse} from '../../typings/Interfaces'
import {login,logout,register} from '../../services/AuthService'
import { Dispatch } from 'redux';
import {
    ui as uiActions,
} from './index'
import { AuthActionEnum as authEnum } from '../../typings/Enums/ActionsRedux';


export const setAuthentication = ():IAuthAction => {
    return ({
        type: authEnum.LOGIN_SUCCESS,
        authenticated: true
    })
};

export const clearAuthentication = ():IAuthAction => {
    logout()
    return ({
        type: authEnum.LOGIN_FAIL,
        authenticated: false
    })
};


export const loginUser = (userData:ILoginRequest) => (dispatch: Dispatch) => {
    
    dispatch(uiActions.setLoading())

    login(userData)
        .then((res:IHttpResponse | null)=>{
            dispatch(uiActions.clearError())
            if(res!=null){
                dispatch(setAuthentication())
            }else{
                dispatch(uiActions.setError())
                dispatch(clearAuthentication())

            }
            

        })
        .catch(err=>{
            clearAuthentication()

            console.error(err);
            dispatch(uiActions.setError())

        }).finally(()=>{
            dispatch(uiActions.clearLoading())
        })
};



export const registerUser = (userData:IRegisterRequest,action:Function) => (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading())
    dispatch(uiActions.clearSuccess())
    dispatch(uiActions.clearError())

    register(userData)
        .then((res)=>{
            dispatch(uiActions.setSuccess())
            action('success','Usuário Cadastrado!','')
            dispatch(uiActions.setRedirect())

        
        })
        .catch(err=>{
            console.log('error',err)
            dispatch(uiActions.setError())
            action('error','Erro no cadastro!', "Usuário e/ou Email já existe!")
            
        })
        .finally(()=>{
            dispatch(uiActions.clearLoading())
        })

}