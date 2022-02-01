import {Action} from 'redux'
import {IResponseData,IAuthReturn,IUIReturn} from './index'


export interface IAction extends Action{
    user: IResponseData | null
}

export interface IReducerReturn{
    auth: IAuthReturn,
    ui: IUIReturn

}