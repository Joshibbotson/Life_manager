import { TodosModel } from '../models/todos.module'
import { IFilter, ITodoQueryOptions } from '../../../../../api/dist/todos/types'
import { Request } from 'express'
import { ISort } from '../../../../../api/dist/users'
export class TodosController {
  public static readonly moduleName: string = 'TodosController'

  private readonly todosModel: TodosModel

  constructor(todosModel: TodosModel) {
    this.todosModel = todosModel
  }

  public async createRequest(request: any) {
    try {
      const todoCreateRequest = request.body
      const post = await this.todosModel.createTodo(todoCreateRequest)
      return post
    } catch (error) {
      throw error
    }
  }

  public async readRequest(request: Request) {
    try {
      const { skip, take, filter, sort, term } = request.query
      const { id } = request.params

      let filters: IFilter
      let sorts: ISort
      if (typeof filter === 'string') {
        filters = JSON.parse(filter)
      }
      if (typeof sort === 'string') {
        sorts = JSON.parse(sort)
      }

      const queryOpts: ITodoQueryOptions = {
        skip: parseInt(skip as string, 10),
        take: parseInt(take as string, 10),
        filter: filters,
        sort: sorts,
        term: term as string,
        id: parseInt(id as string, 10) as number,
      }

      if (queryOpts.id) {
        const data = await this.todosModel.getTodoById(queryOpts.id)
        return data
      }
      const data = await this.todosModel.getTodos(queryOpts)
      return data
    } catch (error) {
      throw error
    }
  }

  public async updateRequest(request: any, response: any) {
    const updateOrError = await this.todosModel.update(request, response)
    return updateOrError
  }

  public async deleteRequest(request: Request) {
    try {
      const deleteOrError = await this.todosModel.deleteTodoById(
        request.body.id,
      )
      return deleteOrError
    } catch (error) {
      throw error
    }
  }
}
