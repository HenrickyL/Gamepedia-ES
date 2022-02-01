import { Request, Response } from 'express'
import { GameRequest, GameResponse, ReviewResponse } from '../dataTranferenceObject';
import { GameService } from '../services/GameService';

export class GameController {

    private constructor(){}

    static async create  (req:Request<{},GameRequest>, res:Response): Promise<Response<GameResponse>> {
        const body = req.body;
        try{
            const game = await GameService.create(body);
            return res.status(201).json(game)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async find (_:any, res:Response): Promise<Response<GameResponse[]>> {
        try{
            const games = await GameService.findAll()
            return res.status(200).json(games)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async findById (req:Request, res:Response): Promise<Response<GameResponse>> {
        try{
            const _id: string = req.params.id
            const game = await GameService.findById(_id)
            return res.status(200).json(game)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async updateById (req:Request, res:Response): Promise<Response<object>> {
        try{
            const body = req.body
            const {id} = req.params
            const result = await GameService.updateById(id, body)
            return res.status(204).json(result)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async deleteById (req:Request, res:Response): Promise<Response<GameResponse>> {
        try{
            const {id} = req.params
            const game = await GameService.deleteById(id)
            return res.status(204).json(game)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async getAllReviews (req:Request, res:Response<ReviewResponse[] | object>): Promise<Response<ReviewResponse[]>> {
        try{
            const {id} = req.params
            const reviews = await GameService.findAllReviewsInGameById(id)
            return res.status(200).json(reviews)
        }catch(err){
            return res.status(404).json({message:err.message})
        }
    }
}