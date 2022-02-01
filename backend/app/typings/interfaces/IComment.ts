import { ObjectId } from 'mongoose'
import {IDocument} from '.'
export interface IComment extends IDocument{
    userId: ObjectId,
    content: string
}
