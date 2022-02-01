import { GameController } from './../controllers';
import {Router} from 'express'

const gameRouter = Router()


gameRouter.get('/games', GameController.find)
gameRouter.get('/games/:id', GameController.findById)
gameRouter.get('/games/:id/reviews', GameController.getAllReviews)



gameRouter.post('/games', GameController.create)

gameRouter.put('/games/:id', GameController.updateById)

gameRouter.delete('/games/:id', GameController.deleteById)



export default gameRouter
