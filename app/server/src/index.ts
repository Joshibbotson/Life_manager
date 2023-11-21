import express from 'express'

import cors from 'cors'
import { ChoresRoutes } from './modules/chores/routes/chores.module'
import { ChoresController } from './modules/chores/controller/chores.module'
import { ChoresModel } from './modules/chores/models/chores.module'
import { Validate } from '../../api/dist/validation/validate'

export const port = 8080
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

server.listen(port, function () {
  console.log(`listening at ${port}`)
})
