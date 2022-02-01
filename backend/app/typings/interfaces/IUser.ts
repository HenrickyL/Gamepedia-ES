import {IDocument} from '.'
export interface IUser extends IDocument {
    img: String
    email: string
    username: string
    nickname: string
    password: string
    birthDate: Date
}