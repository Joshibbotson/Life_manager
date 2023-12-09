import { ChoresModel } from '../models/chores.module'

export class ChoresController {
  public static readonly moduleName: string = 'ChoresController'

  private readonly choresModel: ChoresModel

  constructor(choresModel: ChoresModel) {
    this.choresModel = choresModel
  }

  public async createRequest(request: any, response: any) {
    const post = await this.choresModel.create(request, response)
    return post
  }

  public async readRequest(request: any, page: number, pageSize: number) {
    const data = await this.choresModel.read(request, page, pageSize)
    return data
  }

  public async updateRequest(request: any, response: any) {
    const updateOrError = await this.choresModel.update(request, response)
    return updateOrError
  }

  public async deleteRequest(request: any, response: any) {
    const deleteOrError = await this.choresModel.delete(request, response)
    return deleteOrError
  }
}
