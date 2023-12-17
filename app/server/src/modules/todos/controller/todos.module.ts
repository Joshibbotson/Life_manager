import { TodosModel } from '../models/todos.module'

export class TodosController {
  public static readonly moduleName: string = 'TodosController'

  private readonly todosModel: TodosModel

  constructor(todosModel: TodosModel) {
    this.todosModel = todosModel
  }

  public async createRequest(request: any, response: any) {
    const post = await this.todosModel.create(request, response)
    return post
  }

  public async readRequest(request: any, page: number, pageSize: number) {
    const data = await this.todosModel.read(request, page, pageSize)
    return data
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
