import { IReview } from '../typings/interfaces'
import { StatusEnum } from '../typings/enums'

import { commentSchema } from '../entities'
import { Schema, Types } from 'mongoose' 

const reviewSchema = new Schema<IReview>(
    {
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        gameId: {
            type: Types.ObjectId,
            ref: 'Game',
            required: true
        },
        title: { 
            type: String,
            required:true
        },
        status: {
            type: String,
            default: StatusEnum.DRAFT,
            enum: StatusEnum        
        },
        playTime: {
            type: Number,
            default: 0
        },
        content: {
            type: String,
            default: "",
            required:true

        },
        like: {
            type: [Types.ObjectId],
            ref:'User'
        },
        deslike: {
            type: [Types.ObjectId],
            ref:'User'
        },
        score: {
            type: Number,
            min: [0, '{VAL        commentorted [>=0]'],
            max: [5,'{VALUE} is not supported [<=5]' ] 
        },
        comment: {
            type: [commentSchema],
            default: []
        }
    },
    { 
        timestamps: true,
        versionKey: false 
    }
)

export {reviewSchema}