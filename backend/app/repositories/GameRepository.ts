import { gameSchema } from "../entities"
import { IGame } from "../typings/interfaces"
import { model } from "mongoose"

export const GameRepository = model<IGame>(
    'Game',
    gameSchema
)