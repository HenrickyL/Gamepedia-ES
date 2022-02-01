import { Request, Response } from 'express'
import { UserService } from '../services/UserService';
import { UserResponse, UserRequest } from '../dataTranferenceObject'
import { checkExpire } from '../middleware/authentication';

export class UserController {

    private constructor(){}
    
    static async create (req:Request<UserRequest>, res:Response): Promise<Response<void>>{
        try{
            const body:UserRequest = req.body;
            const user = await UserService.create(body);
            return res.status(201).json(user)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async find (req:Request, res:Response): Promise<Response<UserResponse[]>>{
        let users = undefined
        const email = req.query.email  
        try{
            if (email)
                users = await UserService.findByEmail(String(email))
            else
                users = await UserService.findAll()
            return res.status(200).json(users)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async findById(req:Request, res:Response): Promise<Response<UserResponse>>{
        try{
            const {id} = req.params;
            const user = await UserService.findbyId(id)
            return res.status(200).json(user)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async updateById (req:Request, res:Response): Promise<Response<object>> {
        try{
            const body = req.body
            const {id} = req.params
            const result = await UserService.updateById(id, body)
            return res.status(204).json(result)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async deleteById (req:Request, res:Response): Promise<Response<UserResponse>> {
        try{
            const {id} = req.params
            const user = await UserService.deleteById(id)
            return res.status(204).json(user)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async getAttachment (req:Request, res:Response): Promise<any> {
        try{
            const {id} = req.params
            const img = await UserService.getAttachmentById(id)
            return res.status(200).json(img)
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    static async getData (req: Request, res: Response):Promise<any>{
        let token = req.headers.token
        if(!token){
            return res.status(400).json({error:"Not found token in headers!"})
        }
        
        
        try{
            const {id,exp} = await checkExpire(token)
            
            const user = await UserService.findbyId(id);
            if(user)
                return res.status(200).json({user: user, tokenExpireIn: exp})
            else
                return res.status(400).json({error:"Usuário invaliido!"})

        }catch(e){
            return res.status(500).json({message:e})

        }
    }

}