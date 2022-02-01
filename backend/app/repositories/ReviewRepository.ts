import { IReview } from '../typings/interfaces'
import { reviewSchema } from "../entities"
import { model } from 'mongoose';

export const ReviewRepository = model<IReview>(
    'Review',
    reviewSchema
)