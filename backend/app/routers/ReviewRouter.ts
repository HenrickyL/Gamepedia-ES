import { ReviewController } from './../controllers';
import { Router } from 'express'

const reviewRouter = Router()

reviewRouter.get('/reviews', ReviewController.find)
reviewRouter.get('/reviews/:id', ReviewController.findById)

reviewRouter.post('/reviews', ReviewController.create)

reviewRouter.put('/reviews/:id', ReviewController.updateById)

reviewRouter.delete('/reviews/:id', ReviewController.deleteById)

// Comentarios

reviewRouter.post('/reviews/:id/comments', ReviewController.createCommentByReviewId)
reviewRouter.delete('/reviews/:id/comments', ReviewController.deleteCommentByReviewId)

export default reviewRouter

