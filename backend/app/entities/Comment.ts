import {IComment} from '../typings/interfaces/IComment'
import {Schema} from 'mongoose' 

export const commentSchema = new Schema<IComment>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true
		},
		content: {
			type: String,
			required: true
		}
	}, { 
	  timestamps: true,
	  versionKey: false 
	}
)