import {IUser} from '../typings/interfaces/IUser'
import {Schema} from 'mongoose'

const userSchema = new Schema<IUser>(
    {
        img:{
            type: String,
            default: 'https://i.imgur.com/JtihSIp.png'
        },
        email: { 
            type: String,
            required: true 
        },
        username:{
            type: String,
            required: true 
        },
        nickname:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true 
        },
        birthDate: {
            type: Date,
            required: true
        }
    
    },
    { 
        timestamps: true,
        versionKey: false
    }
)

export {userSchema}

