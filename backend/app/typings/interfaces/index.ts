import {IGame} from './IGame'
import {IUser} from './IUser'
import { IComment } from './IComment'
import IReview from './IReview'

import {Document} from 'mongoose' 

export interface IDocument extends Document{
    createdAt: Date
    updatedAt: Date
}


export {
    IGame,
    IUser,
    IComment,
    IReview
}

