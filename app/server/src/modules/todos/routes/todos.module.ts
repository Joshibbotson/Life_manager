import { server } from '../../..'
import { TodosController } from '../controller/todos.module'
import { Request, Response, NextFunction } from 'express'

enum TodoErrors {
  createTodoError = 'Error creating Todo: ',
  readTodoError = 'Error reading Todo: ',
  readTodosError = 'Error reading Todos: ',
  updateTodoError = 'Error updating Todo: ',
  deleteTodoError = 'Error deleting Todo: ',
}

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
    return server.post(
      '/todos/create',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const post = await this.todosController.createRequest(req)
          res.status(201).json(post)
        } catch (error) {
          res.status(500).json(TodoErrors.createTodoError + error)
        }
      },
    )
  }

  /** Read route */
  protected readHandler(server: any) {
    server.get(
      '/todos/read',
      async (req: Request, res: Response, next: NextFunction) => {
        const { skip, take } = req.query

        try {
          const read = await this.todosController.readRequest(
            req,
            Number(skip),
            Number(take),
          )
          console.log('returned read pre json: ', read)
          res.json(read)
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Internal Server Error' })
        }
      },
    )

    server.get(
      '/todos/read/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        const { skip, take } = req.query
        console.log('Read by id: ', req.query)
        try {
          const read = await this.todosController.readRequest(
            req,
            Number(skip),
            Number(take),
          )
          console.log('returned read pre json: ', read)

          res.json(read)
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Internal Server Error' })
        }
      },
    )
  }

  protected updateHandler(server: any) {
    console.log('update called')
    return server.put(
      '/todos/update/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const updateRequest = await this.todosController.updateRequest(
            req,
            res,
          )
          console.log('Update req!:', updateRequest)
          res.json(updateRequest)
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Update Server Error' })
        }
      },
    )
  }

  protected deleteHandler(server: any) {
    return server.put(
      '/todos/delete/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const deleteRequest = await this.todosController.deleteRequest(
            req,
            res,
          )
          console.log(deleteRequest)
          res.json(deleteRequest)
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: 'Delete Server Error' })
        }
      },
    )
  }
}
