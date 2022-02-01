import { IUser } from '../typings/interfaces'
import { userSchema } from "../entities"
import { model } from 'mongoose'

export const UserRepository =  model<IUser>('User', userSchema)


// class UserRepository{
//     private static schema = userSchema();

//     private constructor(){}

//     static async create(data:UserRequest):Promise<void>{
//         try{
//             await UserRepository.schema.create(data)
//         }catch(err){
//             throw new Error(err.message)
//         }
//     }

//     static async find(query: object = {}, projection: object = {}):Promise<IUser[]>{
//         try{
//             return await UserRepository.schema.find(query, projection)
//         }catch(err){
//             throw new Error(err.message)
//         }
//     }

//     static async findOne(query: object = {}, projection: object = {}):Promise<IUser>{
//         try{
//             return await UserRepository.schema.findOne(query, projection)
//         }catch(err){
//             throw new Error(err.message)
//         }
//     }

// }


// export {UserRepository}