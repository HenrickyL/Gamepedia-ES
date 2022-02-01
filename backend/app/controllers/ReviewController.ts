import { Request, Response } from 'express'
import { CommentRequest, ReviewRequest,ReviewResponse } from '../dataTranferenceObject';
import { ReviewService } from '../services';

export class ReviewController {

    private constructor(){}

    static async create(req:Request<{},ReviewRequest>, res:Response): Promise<Response<void>> {
        const body:ReviewRequest = req.body
        try{
            const review = await ReviewService.create(body);
            return res.status(204).json(review)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async createCommentByReviewId(req:Request, res:Response): Promise<Response<object>> {
        try{
            const {id} = req.params
            const body:CommentRequest = req.body
            console.log(id, body)
            const result = await ReviewService.createCommentByReviewId(id, body)
            return res.status(200).json(result)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async deleteCommentByReviewId(req: Request, res: Response): Promise<Response<object>> {
        const {id} = req.params
        const {userId, commentId} = req.body
        try{
            const result = await ReviewService.deleteCommentByReviewId(id, commentId, userId)
            return res.status(200).json(result)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async find(_:any, res:Response<ReviewResponse[] | object>): Promise<Response<ReviewResponse[]>> {
        try{
            const reviews = await ReviewService.findAll()
            return res.status(200).json(reviews)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async findById(req:Request, res:Response): Promise<Response<object>> {
        try{
            const _id:string = req.params.id
            const review = await ReviewService.findById(_id)
            return res.status(200).json(review)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async updateById(req:Request, res:Response): Promise<Response<object>> {
        try{
            const body = req.body
            const {id} = req.params
            const result = await ReviewService.updateById(id, body)
            return res.status(204).json(result)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async deleteById(req:Request, res:Response): Promise<Response<ReviewResponse>> {
        try{
            const {id} = req.params
            const review = await ReviewService.deleteById(id)
            return res.status(204).json(review)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

}