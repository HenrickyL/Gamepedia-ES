import { IDocument } from '../typings/interfaces'

export class Response{
    protected id: string
    protected createdAt: Date
    protected updatedAt: Date

    constructor(obj:IDocument){
        this.id = obj._id
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
}