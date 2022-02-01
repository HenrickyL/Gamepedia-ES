import { Types } from 'mongoose';
import { UserService,GameService } from '.';
import { CommentRequest, ReviewRequest, ReviewResponse } from '../dataTranferenceObject'
import { ReviewPopulateResponse } from '../dataTranferenceObject/Review';
import { ReviewRepository } from '../repositories'
import { NotFoundError, BadRequestError, InternError } from '../typings/exceptions/httpExceptions';

export class ReviewService {

    private constructor() {}
    static validation(data:ReviewRequest):ReviewRequest{
        data.title = data.title.toLowerCase()
        return data
    }

    static async create(data: ReviewRequest): Promise<ReviewResponse> {
        data = ReviewService.validation(data);
        const {gameId,userId,title} = data 

        const userExist = await UserService.findbyId(userId);
        if(!userExist)
            throw new BadRequestError("User with this ID not Found!");
        const gameExist = await GameService.findById(gameId);
        if(!gameExist)
            throw new BadRequestError("Game with this ID not Found!");
        const reviewExist = await ReviewRepository.findOne({title: title, userId:userId})
        if(!reviewExist){
            const review = await ReviewRepository.create(data)
            return new ReviewResponse(review)
        }
        throw new BadRequestError("Review already exists for this user!");
    }

    static async createCommentByReviewId(reviewId: string, data: CommentRequest): Promise<object>{
        const reviewQuery = ReviewRepository.findById(reviewId)
        if(!reviewQuery)
            throw new BadRequestError('Not found this id')
        const result = await ReviewRepository.updateOne(reviewQuery, {
            "$addToSet": {
                "comment":data
            }
        })
        return result
    }

    static async deleteCommentByReviewId(reviewId: string, commentId: string, userId:string): Promise<object> {
        const reviewQuery = ReviewRepository.findById(reviewId)
        const entityReview = await reviewQuery
        
        if(!reviewQuery)
            throw new BadRequestError('Not found this id')
        
        let isReviewer = null
        if( entityReview.userId instanceof Types.ObjectId)
            isReviewer = entityReview.userId.equals(userId)
        else{
            throw new Error('Intern Type Error')
        }
        const filterQuery = isReviewer ? {
            "_id": reviewId,
            "comment._id":commentId
        }:{
            "_id": reviewId,
            "comment._id":commentId,
            "comment.userId":userId
        }
        
        const updateQuery = {
            "$pull": {
                "comment": isReviewer ? {
                    "_id": commentId
                }:{
                    "_id": commentId,
                    "userId": userId
                } 
            }
        } 

        return await ReviewRepository.updateOne(filterQuery, updateQuery)
    }

    static async findAll(): Promise<ReviewResponse[]> {

        const review = await ReviewRepository.find();
        if (!review)
            throw new NotFoundError("Intern Error")
        return review.map(g => new ReviewResponse(g))

    }

    static async findById(_id: string): Promise<object> {
        
        const review = await ReviewRepository.findOne({_id})
        .populate({
            path: 'userId'
             })
        .populate({
            path: 'gameId'
        })
        if (!review)
            throw new NotFoundError("Intern Error")
        return  new ReviewPopulateResponse(review)

    }

    static async updateById(_id: string, data: ReviewRequest): Promise<object> {
        const review = ReviewRepository.findById(_id)
        if(!review)
            throw new BadRequestError('Not found this id')
        const result = await ReviewRepository.updateOne(review, data)
        return result
    }

    static async deleteById(_id: string): Promise<ReviewResponse> {
        const exists = await ReviewRepository.findByIdAndDelete(_id);
        if(!exists)
            throw new BadRequestError("Not exists this game!")
        return new ReviewResponse(exists)  
    }

    static async getGameReviews(gameId:string):Promise<ReviewResponse[]>{
        const reviews = await ReviewRepository.find({gameId});
        return reviews.map(r=>new ReviewResponse(r));

    }
}

