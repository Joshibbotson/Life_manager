import { todosSchema } from '../../../../../api/dist/todos/actions'
import { Validate } from '../../../../../api/dist/validation/validate'
import { AppDataSource } from '../../../data-source'
import { Todos } from '../../../entities/todos'
import { Users } from '../../../entities/users'

export class TodosModel {
  public static readonly moduleName: string = 'TodosModel'
  public readonly validate: Validate

  constructor(validate: Validate) {
    this.validate = validate
  }

  public async create(request: any, response: any) {
    const post = await this.postTodo(request, response)
    return post
  }

  public async read(request: any, skip: number, take: number) {
    if (request.params.id) {
      return this.getTodoById(request)
    }
    return this.getTodos(skip, take)
  }

  public async update(request: any, response: any) {
    return this.updateTodoById(request, response)
  }

  public async delete(request: any, response: any) {
    return this.deleteTodoById(request, response)
  }

  private async postTodo(req: any, res: any) {
    console.log('post')
    try {
      const todo = new Todos()
      const user = await AppDataSource.getRepository(Users).findOneBy({
        id: 1,
      })
      const payload = req.body
      todo.name = payload.name
      todo.description = payload.description
      todo.assignedTo = payload.assignedTo
      todo.createdBy = payload.createdBy
      todo.completed = payload.completed
      todo.user = user
      const readOrError = await this.validate.validateSchema(todo, todosSchema)
      if (readOrError) {
        console.log(readOrError)
        const read = await AppDataSource.getRepository(Todos).save(todo)
        return read
      } else {
        console.log('failed schema validation')
      }
    } catch (error) {
      console.error('Error posting todos', error)
      res.status(500).send('Internal Server Error')
    }
  }

  private async getTodos(skip: number, take: number) {
    try {
      const todoRepository = AppDataSource.manager.getRepository(Todos)
      console.log('skip:', skip)
      console.log('take:', take)
      const todos = await todoRepository.findAndCount({
        skip: skip,
        take: take,
        where: {
          deletedDate: null,
        },
      })
      const todosData = {
        skip: skip,
        take: take,
        count: todos[1],
        data: todos[0],
      }

      return todosData
    } catch (error) {
      console.error('Error fetching todos', error)
      throw new Error('Internal Server Error')
    }
  }

  private async getTodoById(request) {
    console.log('got todo by id')
    try {
      const id: number = request.params.id
      const todoRepository = AppDataSource.manager.getRepository(Todos)
      const todo = await todoRepository.findOne({
        where: {
          id: id,
        },
      })
      if (!todo) {
        request.status(500).send('Todo not found')
      }
      return todo
    } catch (error) {
      console.error('Error fetching todo', error)
      request.status(500).send('Internal Server Error')
    }
  }

  private async deleteTodoById(req, res) {
    try {
      console.log('delete by id: ', req.body.id)
      const todo = await AppDataSource.getRepository(Todos).findOneBy({
        id: req.body.id,
      })
      if (todo) {
        await AppDataSource.getRepository(Todos).softDelete({
          id: req.body.id,
        })
      }

      // await AppDataSource.getRepository(Todos).save(todo)
      return todo
    } catch (error) {
      console.error('Error fetching todos', error)
      res.status(500).send('Internal Server Error')
    }
  }

  private async updateTodoById(req, res) {
    try {
      const todo = await AppDataSource.getRepository(Todos).findOneBy({
        id: req.body.id,
      })
      todo.completed = true
      await AppDataSource.getRepository(Todos).save(todo)
      return todo
    } catch (error) {
      console.error('Error fetching todos', error)
      res.status(500).send('Internal Server Error')
    }
  }
}
