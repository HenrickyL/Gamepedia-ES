import {IComment, IUser} from '../typings/interfaces'
import {Response} from './Response'
import {ObjectId} from 'mongoose'

export interface CommentRequest{
    userId: string
    content: string
}

export class CommentResponse extends Response{
    private readonly userId:  ObjectId
    private readonly content: string
    
    constructor(obj: IComment){
        super(obj)
        this.userId = obj.userId
        this.content = obj.content
    }
}


export class CommentPopulatedResponse extends Response{
    private readonly userId:  ObjectId
    private readonly user:  IUser
    private readonly content: string
    
    constructor(obj: any){
        super(obj)
        this.userId = obj.userId._id
        this.user = obj.userId._id
        this.content = obj.content
    }
}


