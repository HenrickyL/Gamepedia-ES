import {IGame, IImages} from '../typings/interfaces/IGame'
import {Schema} from 'mongoose' 

export const gameSchema = new Schema<IGame>(
    {
        images: {
            type: Object
        },
        title: { 
            type: String,
            required: true 
        },
        tags: { 
            type: [String],
        },
        synopsis: { 
            type: String,
            required: true 
        },
        score: { 
            type: Number,
            min: [0, '{VALUE} is not supported [>=0]'],
            max: [5,'{VALUE} is not supported [<=5]' ] 
        },
        features: { 
            type: [String],
        },
        details: {
            type: Object
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
)    






