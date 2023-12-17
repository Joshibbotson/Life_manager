import express from 'express'

import cors from 'cors'
import { TodosRoutes } from './modules/todos/routes/todos.module'
import { TodosController } from './modules/todos/controller/todos.module'
import { TodosModel } from './modules/todos/models/todos.module'
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

const todosModel = new TodosModel(new Validate())
const todosController = new TodosController(todosModel)
const todosRoutes = new TodosRoutes(todosController)

const usersModel = new UsersModel(new Validate())
const usersController = new UsersController(usersModel)
const usersRoutes = new UsersRoutes(usersController)

server.listen(port, function () {
  console.log(`listening at ${port}`)
})
