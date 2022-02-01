import {IUser} from '../typings/interfaces'
import {Response} from './Response'

export interface UserRequest{
    email: string
    password: string
    nickname?: string
    username: string
    img: string,
    birthDate: Date
}

export class UserResponse extends Response{
    private readonly nickname?: string
    private readonly email: string
    private readonly username: string
    private readonly img: String
    private readonly birthDate?: Date

    constructor(obj: IUser){
        super(obj)
        this.email = obj.email
        this.nickname = obj.nickname
        this.email = obj.email
        this.username = obj.username
        this.birthDate = obj.birthDate
        this.img = obj.img 
    }
}


export class UserMinResponse extends Response{
    private readonly nickname?: string
    private readonly username: string
    private readonly img: String

    constructor(obj: IUser){
        super(obj)
        this.nickname = obj.nickname
        this.username = obj.username
        this.img = obj.img 
    }
}
