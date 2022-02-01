import {IUser} from './index'

export interface IResponseData{
    token: string,
    user?:IUser
}

export interface IHttpResponse{
    data: IResponseData,
    status: number
}

export interface ILoginRequest{
    email:string,
    password: string
}

export interface IRegisterRequest{
    email:string,
    password: string,
    data: string,
    gender: number,
    username:string
}

