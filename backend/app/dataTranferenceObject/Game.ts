import {IGame} from '../typings/interfaces'
import { Schema } from "mongoose"
import {Response} from './Response'
import { IDetails,IImages } from '../typings/interfaces/IGame'
import {ParentalRatingEnum} from '../typings/enums'

export interface GameRequest{
    images: IImages
    title: string
    tags: string[]
    synopsis: string
    score: number
    features: string[]
    details: IDetails
}

export class GameResponse extends Response{
    private readonly images: IImages
    private readonly title: string
    private readonly tags: string[]
    private readonly synopsis: string
    private readonly score: number
    private readonly features: string[]
    private readonly details: IDetails

    constructor(obj: IGame){
        super(obj)
        this.images = obj.images
        this.title = obj.title
        this.tags = obj.tags
        this.synopsis = obj.synopsis
        this.score = obj.score
        this.features = obj.features
        this.details = obj.details
    }
}
