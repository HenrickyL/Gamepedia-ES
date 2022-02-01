import { IResponseData } from './HttpResponse';
import { Action } from "redux";

export interface IUser{

}

export interface IAuthReturn{
    authenticated: boolean,
    user?:IUser | null
}

export interface IAuthAction extends Action{
    authenticated: boolean,
    user?:IResponseData | null 
}

