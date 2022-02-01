import {IDocument } from '.'
import {ParentalRatingEnum, WarnsGamesEnum} from '../enums'
interface IEspecification{
    operationSystem: string
    processor: string
    memory: string
    storage: string
    graphics: string 
    others: string
}


export type patentalKeys = keyof typeof ParentalRatingEnum
export type warnsKeys = keyof typeof WarnsGamesEnum

export interface IDetails{
    realeseDate: Date 
    parentalRating: patentalKeys
    genders: string[]
    developer: string
    publisher: string
    price:number
    warns: WarnsGamesEnum[]
    languages: string[]
    platforms: string[]
    especifications: {
        minimum: IEspecification
        recommended: IEspecification
    }
}
//links das imagens
export interface IImages {
    logoText: string,
    logo: string,
    background: string,
    attachment: string[],
    parentalRatingImage:string,
    symbol:string  
}

export interface IGame extends IDocument{
    images: IImages
    title: string
    tags: string[]
    synopsis: string
    score: number
    features: string[]
    details: IDetails

}