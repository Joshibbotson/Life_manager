import express from 'express'
import cors from 'cors'
import { TodosRoutes } from './modules/todos/routes/todos.module'
import { TodosController } from './modules/todos/controller/todos.module'
import { TodosModel } from './modules/todos/models/todos.module'
import { UsersModel } from './modules/users/models/users.module'
import { UsersController } from './modules/users/controllers/users.module'
import { UsersRoutes } from './modules/users/routes/users.module'
import { Validate } from '../../api/dist/validation/validation'
import { rateLimit } from 'express-rate-limit'
import { TodosJob } from './modules/todos/jobs/todos.module'
export const port = process.env.EXPRESS_PORT
export const server = express()

server.use(
  cors({
    origin: ['http://localhost:4200',
     'http://167.71.78.46:4200',
      'http://167.71.78.46:80',
       'http://www.lifemanager.space:4200',
        'http://www.lifemanager.space:80',
         'http://www.lifemanager.space',
         'http://lifemanager.space',

        ],
  })
);
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

server.use(limiter)
server.use(express.json())

const todosModel = new TodosModel(new Validate())
const todosController = new TodosController(todosModel, new Validate())
const todosRoutes = new TodosRoutes(todosController)
const todosJob = new TodosJob()

const usersModel = new UsersModel(new Validate())
const usersController = new UsersController(usersModel)
const usersRoutes = new UsersRoutes(usersController)

server.listen(Number(port), '0.0.0.0', function () {
  console.log(`listening at ${port}`)
})
