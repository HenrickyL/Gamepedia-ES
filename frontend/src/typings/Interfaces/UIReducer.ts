import { Action } from 'redux';



export interface IUIReturn{
    loading: boolean,
    error: boolean,
    redirect: boolean
    success: boolean
}


export interface IUIAction extends Action{
    loading?: boolean,
    error?: boolean,
    redirect?: boolean
    success?: boolean
}