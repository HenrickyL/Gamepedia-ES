import { Types } from 'mongoose'
import {StatusEnum} from '../enums/StatusEnum'
import {IDocument,IComment, IUser} from '../interfaces'
import { IGame } from './IGame'


export default interface IReview extends IDocument{
    title: string
    status: StatusEnum
    playTime: number
    content: string
    like: Types.ObjectId[]
    deslike: Types.ObjectId[]
    score: number
    comment: IComment[]
    userId: Types.ObjectId
    gameId: Types.ObjectId
}
