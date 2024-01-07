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
          console.log('post:', post)
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
        try {
          const read = await this.todosController.readRequest(req)
          console.log('returned read pre json: ', read)
          res.status(200).json(read)
        } catch (error) {
          res.status(500).json(TodoErrors.readTodosError + error)
        }
      },
    )

    server.get(
      '/todos/read/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        console.log('Read by id: ', req.params)
        try {
          const read = await this.todosController.readRequest(req)
          console.log('returned todo by id pre json: ', read)
          res.status(200).json(read)
        } catch (error) {
          res.status(500).json(TodoErrors.readTodoError + error)
        }
      },
    )
  }

  // needs overhaul
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
          res.status(200).json(updateRequest)
        } catch (error) {
          console.log(error)
          res.status(500).json(TodoErrors.updateTodoError + error)
        }
      },
    )
  }

  protected deleteHandler(server: any) {
    return server.put(
      '/todos/delete/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const deleteRequest = await this.todosController.deleteRequest(req)
          console.log(deleteRequest)
          res.status(200).json(deleteRequest)
        } catch (error) {
          res.status(500).json(TodoErrors.deleteTodoError + error)
        }
      },
    )
  }
}
