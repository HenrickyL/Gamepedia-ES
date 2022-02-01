import { Router } from 'express'
import { UserController } from '../controllers'
import { login, authentication } from '../middleware/authentication'
/* Tipos de parametros
* Params - params rotas (localhost:333/1)
* Query - filtros e buscas (localhost:333/1?search=algumacoisa)
* Body - Inserções e json
*/

const userRouter = Router()

userRouter.post('/login', login)

// userRouter.use('/users',authentication)

userRouter.get('/users/me', UserController.getData)

userRouter.get('/users', UserController.find)

userRouter.get('/users/:id', UserController.findById)
userRouter.get('/users/:id/attachment', UserController.getAttachment)

userRouter.post('/users', UserController.create)

userRouter.put('/users/:id', UserController.updateById)

userRouter.delete('/users/:id', UserController.deleteById)




export default userRouter
