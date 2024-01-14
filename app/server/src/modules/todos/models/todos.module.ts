import { CreateTodoSchema } from '../../../../../api/dist/todos/actions'
import { Validate } from '../../../../../api/dist/validation/validation'
import { AppDataSource } from '../../../data-source'
import { Todos } from '../../../entities/todos'
import { ITodoQueryOptions } from '../../../../../api/dist/todos/types'
import { SelectQueryBuilder } from 'typeorm'
import { DateTime } from 'luxon'

export class TodosModel {
  public static readonly moduleName: string = 'TodosModel'
  public readonly validate: Validate

  constructor(validate: Validate) {
    this.validate = validate
  }

  // FIXJOB : Add output validation.
  public async createTodo(todoCreateRequest: any) {
    try {
      const todoEntity = new Todos()
      todoEntity.title = todoCreateRequest.title
      todoEntity.description = todoCreateRequest.description
      todoEntity.createdBy = todoCreateRequest.createdBy
      todoEntity.completed = todoCreateRequest.completed
      todoEntity.dueDate = new Date(todoCreateRequest.dueDate)
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
          relations: ['createdBy'],
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

      query = query.leftJoinAndSelect('todo.createdBy', 'createdBy')

      query = query.where('todo.deletedDate IS NULL')
      if (queryOpts.filter !== undefined) {
        if (queryOpts.filter.createdById) {
          query = query.andWhere('todo.createdBy = :createdById', {
            createdById: queryOpts.filter.createdById,
          })
        }
      }
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
    try {
      const todoRepository = AppDataSource.manager.getRepository(Todos)
      const todo = await todoRepository.findOne({
        where: {
          id: id,
        },
        relations: ['createdBy'],
      })
      if (!todo) {
        throw new Error('Todo not found')
      }
      return {
        data: todo,
        error: null,
      }
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

  /* Rudimentary, requires over haul as only updates completed, ideally we want to be able
  to update the entire todo */
  public async updateTodoById(id: number, version: number) {
    try {
      const todoRepository = AppDataSource.manager.getRepository(Todos)
      const todo = await todoRepository.findOne({
        where: {
          id: id,
        },
        relations: ['createdBy'],
      })
      if (!todo) {
        throw new Error('Todo not found')
      }

      if (todo.version !== version) {
        throw new Error('The todo item has been modified by someone else')
      }

      todo.completed = !todo.completed
      await todoRepository.save(todo)
      return todo
    } catch (error) {
      throw error
    }
  }
}
