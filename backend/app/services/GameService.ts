import { ReviewService } from './ReviewService';
import { GameResponse, GameRequest, ReviewResponse } from '../dataTranferenceObject';
import { GameRepository } from '../repositories/GameRepository';
import { ParentalRatingEnum } from '../typings/enums';
import { BadRequestError } from '../typings/exceptions/httpExceptions';
import { IGame } from '../typings/interfaces';

export class GameService {

    private constructor() {}
    static validation(data:GameRequest):GameRequest{
        data.title = data.title.toLowerCase()
        data.details.developer = data.details.developer.toLowerCase()
        data.details.publisher = data.details.publisher.toLowerCase()



        return data;
    }
    static async create(data: GameRequest): Promise<GameResponse> {
        data = GameService.validation(data)

        const key =  data.details.parentalRating
        if(key in ParentalRatingEnum){
            data.images.parentalRatingImage = ParentalRatingEnum[key]
        }


        const exist = await GameRepository.findOne({title: data.title})
        if(exist)
            throw new Error("Game already Exists!");

        const game = await GameRepository.create(data)

        return new GameResponse(game)
    }

    static async findAll(): Promise<GameResponse[]> {

        const games = await GameRepository.find();
        
        return games.map(g=>new GameResponse(g))

    }

    static async findById(_id: string): Promise<GameResponse | null> {

        const game = await GameRepository.findOne({_id});
        return game ?new GameResponse(game):null

    }

    static async updateById(_id: string, data: GameRequest): Promise<object> {
        
        const game = GameRepository.findById(_id)
        if(!game)
            throw new BadRequestError("Id not found")
        return await GameRepository.updateOne(game, data)
    }

    static async deleteById(_id: string): Promise<GameResponse> {
        const exists = await GameRepository.findByIdAndDelete(_id);
        if(!exists)
            throw new BadRequestError("Not exists this game!")
        return new GameResponse(exists)  
    }
    
    static async findAllReviewsInGameById(_id:string):Promise<ReviewResponse[]>{
        const gameExist = await GameRepository.findById(_id);
        if(!gameExist)
            throw new BadRequestError("Game with this Id not found!")
        const reviews = ReviewService.getGameReviews(_id);
        return reviews
    }

}

 