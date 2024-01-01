import { TodosModel } from '../models/todos.module'
import { ITodoQueryOptions } from '../../../../../api/dist/todos/types'
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

  public async readRequest(request: any) {
    try {
      const { skip, take, filter, sort, term } = request.query
      const { id } = request.params

      const queryOpts: ITodoQueryOptions = {
        skip: skip,
        take: take,
        filter: filter,
        sort: sort,
        term: term,
        id: id,
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

  public async deleteRequest(request: any, response: any) {
    const deleteOrError = await this.todosModel.delete(request, response)
    return deleteOrError
  }
}
