import { Validate } from '../../../../../api/dist/validation/validation'
import { server } from '../../..'
import { TodosController } from '../controller/todos.module'

export class TodosRoutes {
  public static readonly moduleName: string = 'TodosRoutes'

  private todosController: TodosController

  constructor(todosController: TodosController) {
    this.todosController = todosController
  }

  private readonly createRoute = this.createHandler(server)
  private readonly readRoute = this.readHandler(server)
  private readonly updateRoute = this.updateHandler(server)
  private readonly deleteRoute = this.deleteHandler(server)

  protected createHandler(server: any) {
    console.log('createHandler')
    return server.post('/todos/create', async (req, res, next) => {
      try {
        const post = await this.todosController.createRequest(req, res)
        console.log(post)
        res.json(post)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })
  }

  /** Read route */
  protected readHandler(server: any) {
    server.get('/todos/read', async (req, res, next) => {
      const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0
      const take = req.query.take ? parseInt(req.query.take, 10) : 10
      console.log('skip route:', skip)
      console.log('take route:', take)

      try {
        const read = await this.todosController.readRequest(req, skip, take)
        console.log('returned read pre json: ', read)
        res.json(read)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })

    server.get('/todos/read/:id', async (req, res, next) => {
      const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0
      const take = req.query.take ? parseInt(req.query.take, 10) : 10
      console.log('Read by id: ', req.query)
      try {
        const read = await this.todosController.readRequest(req, skip, take)
        console.log('returned read pre json: ', read)

        res.json(read)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })
  }

  protected updateHandler(server: any) {
    console.log('update called')
    return server.put('/todos/update/:id', async (req, res, next) => {
      try {
        const updateRequest = await this.todosController.updateRequest(req, res)
        console.log('Update req!:', updateRequest)
        res.json(updateRequest)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Update Server Error' })
      }
    })
  }

  protected deleteHandler(server: any) {
    return server.put('/todos/delete/:id', async (req, res, next) => {
      try {
        const deleteRequest = await this.todosController.deleteRequest(req, res)
        console.log(deleteRequest)
        res.json(deleteRequest)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Delete Server Error' })
      }
    })
  }
}
