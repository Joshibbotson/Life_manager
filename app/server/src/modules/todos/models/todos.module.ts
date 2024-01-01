import { DateTime } from 'luxon'
import { CreateTodoSchema } from '../../../../../api/dist/todos/actions'
import { Validate } from '../../../../../api/dist/validation/validation'
import { AppDataSource } from '../../../data-source'
import { Todos } from '../../../entities/todos'
import { Users } from '../../../entities/users'
import { ITodoQueryOptions } from '../../../../../api/dist/todos/types'
import { SelectQueryBuilder } from 'typeorm'

export class TodosModel {
  public static readonly moduleName: string = 'TodosModel'
  public readonly validate: Validate

  constructor(validate: Validate) {
    this.validate = validate
  }

  public async update(request: any, response: any) {
    return this.updateTodoById(request, response)
  }

  public async createTodo(todoCreateRequest: any) {
    try {
      const todoEntity = new Todos()
      console.log('todoCreateRequest: ', todoCreateRequest)
      todoEntity.title = todoCreateRequest.title
      todoEntity.description = todoCreateRequest.description
      todoEntity.assignedTo = todoCreateRequest.assignedTo[0]
      todoEntity.createdBy = todoCreateRequest.createdBy
      todoEntity.completed = todoCreateRequest.completed
      todoEntity.dueDate = new Date(todoCreateRequest.dueDate)
      console.log('formattedtodo: ', todoEntity)
      const readOrError = await this.validate.validateSchema(
        todoEntity,
        CreateTodoSchema,
      )

      if (typeof readOrError === 'string') {
        throw readOrError
      } else {
        const todosRepository = AppDataSource.getRepository(Todos)
        const savedTodo = await todosRepository.save(todoEntity)
        const todo = await AppDataSource.getRepository(Todos).findOne({
          where: { id: savedTodo.id },
          relations: ['createdBy', 'assignedTo'],
        })
        return todo
      }
    } catch (error) {
      throw error
    }
  }

  public async getTodos(queryOpts: ITodoQueryOptions) {
    try {
      const todoRepository = AppDataSource.getRepository(Todos)

      let query: SelectQueryBuilder<Todos> =
        todoRepository.createQueryBuilder('todo')

      query = query
        .leftJoinAndSelect('todo.createdBy', 'createdBy')
        .leftJoinAndSelect('todo.assignedTo', 'assignedTo')

      query = query.where('todo.deletedDate IS NULL')
      if (queryOpts.filter !== undefined) {
        if (queryOpts.filter.createdById) {
          query = query.andWhere('todo.createdBy = :createdById', {
            createdById: queryOpts.filter.createdById,
          })
        }
      }
      console.log(query)
      if (queryOpts.skip !== undefined) {
        query = query.skip(queryOpts.skip)
      }
      if (queryOpts.take !== undefined) {
        query = query.take(queryOpts.take)
      }

      const [todos, count] = await query.getManyAndCount()

      return {
        skip: queryOpts.skip,
        take: queryOpts.take,
        count: count,
        data: todos,
      }
    } catch (error) {
      throw error
    }
  }

  public async getTodoById(id: number) {
    console.log('got todo by id')
    try {
      const todoRepository = AppDataSource.manager.getRepository(Todos)
      const todo = await todoRepository.findOne({
        where: {
          id: id,
        },
        relations: ['createdBy', 'assignedTo'],
      })
      if (!todo) {
        throw new Error('Todo not found')
      }
      return todo
    } catch (error) {
      throw error
    }
  }

  public async deleteTodoById(id: number) {
    try {
      const todo = await AppDataSource.getRepository(Todos).findOneBy({
        id: id,
      })
      if (todo) {
        await AppDataSource.getRepository(Todos).softDelete({
          id: id,
        })
      }
      return todo
    } catch (error) {
      throw error
    }
  }

  // Rudimentary, requires overall.
  private async updateTodoById(req, res) {
    try {
      const todo = await AppDataSource.getRepository(Todos).findOneBy({
        id: req.body.id,
      })
      todo.completed = !todo.completed
      await AppDataSource.getRepository(Todos).save(todo)
      return todo
    } catch (error) {
      console.error('Error fetching todos', error)
      res.status(500).send('Internal Server Error')
    }
  }
}
