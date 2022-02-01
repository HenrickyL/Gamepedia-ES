import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {NextFunction, Request,Response} from 'express'
import { UserRepository } from '../repositories/UserRepository'

interface ILoginRequest{
    email: string
    password: string
}


export const login = async(req:Request, res:Response): Promise<Response>=>{
    try{
        const data:ILoginRequest = req.body;
        data.email = data.email.toLowerCase();


        const userExists = await UserRepository.findOne({email: data.email });
        if(userExists){
            const result = bcrypt.compareSync(data.password,userExists.password);
            if(result){
                const token = jwt.sign({
                        id: userExists.id,
                        username: userExists.username
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '2h'
                })
                return res.status(200).json({token: token})
            }else{
                return res.status(401).json({mensagem:'invalid email or password!'})
            }
        }else{
            return res.status(401).json({mensagem:'invalid email or password!'})
        }


    }catch(e){
        return res.status(500).json({message: e})
    }
}


export const authentication = (req:Request,res:Response,next:NextFunction): Response | any =>{
    const token = Array.isArray(req.headers.token)? null : req.headers.token

    if(!token)  return res.status(401).json({message:'Token Invalido!'})
        jwt.verify(token, process.env.JWT_KEY,(err)=>{
            if(err){
                return res.status(401).json({message:'Token Invalido!'})
            }else{
                next()
            }
    })

}


export const checkExpire = async(token)=>{
    try{
        const decode = await jwt.verify(token, process.env.JWT_KEY)
        if(typeof(decode) == "string")
            throw new Error("[JWT] Return Type JWT is a String")
        if (Date.now() <=  decode.exp * 1000) {
            return decode;
        }else{
            return null //expirado
        }
    }catch(err){
        throw  new Error('[JWT] '+err)
    }
}
