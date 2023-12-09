import express from 'express'

import cors from 'cors'
import { ChoresRoutes } from './modules/chores/routes/chores.module'
import { ChoresController } from './modules/chores/controller/chores.module'
import { ChoresModel } from './modules/chores/models/chores.module'
import { Validate } from '../../api/dist/validation/validate'
import { UsersModel } from './modules/users/models/users.module'
import { UsersController } from './modules/users/controllers/users.module'
import { UsersRoutes } from './modules/users/routes/users.module'

export const port = process.env.EXPRESS_PORT || 8080
export const server = express()
server.use(express.json())
server.use(
  cors({
    origin: '*',
  }),
)

const choresModel = new ChoresModel(new Validate())
const choresController = new ChoresController(choresModel)
const choresRoutes = new ChoresRoutes(choresController)

const usersModel = new UsersModel(new Validate())
const usersController = new UsersController(usersModel)
const usersRoutes = new UsersRoutes(usersController)

server.listen(port, function () {
  console.log(`listening at ${port}`)
})
