import {IGame, IReview, IUser} from '../typings/interfaces'
import {StatusEnum} from '../typings/enums'

import { CommentRequest, CommentResponse, GameResponse, UserResponse } from '.'
import {Response} from './Response'
import { Types } from "mongoose"

export interface ReviewRequest{
    userId: string
    gameId: string
    title: string
    playTime: number
    content: string
}

export class ReviewResponse extends Response{
    private readonly userId: Types.ObjectId 
    private readonly gameId: Types.ObjectId
    private readonly title: string
    private readonly status: StatusEnum
    private readonly playTime: number
    private readonly like: Types.ObjectId[]
    private readonly deslike: Types.ObjectId[]
    private readonly content: string
    private readonly score: number
    private readonly comment: CommentResponse[]
    
    constructor(obj:IReview){
        super(obj)
        this.title = obj.title
        this.status = obj.status
        this.playTime = obj.playTime
        this.content = obj.content
        this.score = obj.score
        this.deslike = obj.deslike
        this.like = obj.like
        this.comment = obj.comment.map(c => new CommentResponse(c)) 
    
        this.userId = obj.userId

        this.gameId = obj.gameId
       

    }
}


export class ReviewPopulateResponse extends Response{
    private readonly userId: Types.ObjectId 
    private readonly gameId: Types.ObjectId
    private readonly user: UserResponse
    private readonly game: GameResponse
    private readonly title: string
    private readonly status: StatusEnum
    private readonly playTime: number
    private readonly like: Types.ObjectId[]
    private readonly deslike: Types.ObjectId[]
    private readonly content: string
    private readonly score: number
    private readonly comment: CommentResponse[]
    
    constructor(obj:any){
        super(obj)
        this.title = obj.title
        this.status = obj.status
        this.playTime = obj.playTime
        this.content = obj.content
        this.score = obj.score
        this.deslike = obj.deslike
        this.like = obj.like
        this.comment = obj.comment.map(c => new CommentResponse(c)) 
    
        this.userId = obj.userId._id
        this.gameId = obj.gameId._id
        this.user = new UserResponse(obj.userId) 
        this.game = new GameResponse(obj.gameId) 

    }
}
   