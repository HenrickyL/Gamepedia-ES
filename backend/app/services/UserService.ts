import bcrypt from 'bcrypt'
import { UserRequest,UserResponse} from '../dataTranferenceObject'
import { UserRepository } from '../repositories/UserRepository';
import { BadRequestError } from '../typings/exceptions/httpExceptions';



// criar o crud, criar validações
export class UserService{
    private static readonly repository = UserRepository;
    
    private constructor(){}

   
    static validate(data: UserRequest): UserRequest{
        const {email, password,username} = data
        data.email = email.toLowerCase()
        data.username = username.toLowerCase()
        data.password = bcrypt.hashSync(password,10);
        return data
    }

    static async create(data:UserRequest):Promise<void>{
        data = UserService.validate(data)
        
        const userAlreadyExists = await UserService.repository.findOne({
            '$or':[
                {email: data.email},
                {username:data.username}
            ]
        })
        if(userAlreadyExists){
            throw new Error('User already Exists!')
        }
        if (!data.nickname)
            data.nickname = data.username
        await UserService.repository.create(data)
    }

    static async findAll():Promise<UserResponse[]>{
        const users = await UserService.repository.find();
        if(!users)
            throw new Error("No registered user!")
        return users.map(user => new UserResponse(user))

    }

    static async findByEmail(email:string): Promise<UserResponse>{
        email = email.toLowerCase()

        const user = await UserService.repository.findOne({email})

        return new UserResponse(user);
    }

    static async findbyId(_id:string): Promise<UserResponse|null>{

        const user = await UserRepository.findOne({_id})
        return user ? new UserResponse(user): null;
    }

    static async updateById(_id: string, data: UserRequest): Promise<object> {

        const user = UserRepository.findById(_id)
        if (!user)
            throw new BadRequestError("Intern Error")
        return UserRepository.updateOne(user, data)
    }

    static async deleteById(_id: string): Promise<UserResponse> {
        const exists = await UserRepository.findByIdAndDelete(_id);
        if(!exists)
            throw new BadRequestError("Not exists this game!")
        return new UserResponse(exists)  
    }

    static async getAttachmentById(id:string):Promise<any>{

        const user =  await UserRepository.findById(id)
        const {_id, img}= user

        if(!user)
            return {id:_id,img:null }
        return {id,img}
    }
    
}

