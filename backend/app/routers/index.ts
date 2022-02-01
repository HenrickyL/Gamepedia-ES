import gameRouter from "./GameRouter"
import reviewRouter from "./ReviewRouter"
import userRouter from "./UserRouters"
import {Express, Response} from 'express'
const routes = [gameRouter, reviewRouter, userRouter]


export default routes

