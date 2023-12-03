import { UsersModel } from '../models/users.module'

export class UsersController {
  public static readonly moduleName: string = 'UsersController'

  private readonly usersModel: UsersModel

  constructor(usersModel: UsersModel) {
    this.usersModel = usersModel
  }

  public async createRequest(request: any, response: any) {
    const post = await this.usersModel.create(request, response)
    return post
  }

  public async readRequest(request: any, page: number, pageSize: number) {
    const data = await this.usersModel.read(request, page, pageSize)
    return data
  }

  public async updateRequest(request: any, response: any) {
    const updateOrError = await this.usersModel.update(request, response)
    return updateOrError
  }

  public async deleteRequest(request: any, response: any) {
    const deleteOrError = await this.usersModel.delete(request, response)
    return deleteOrError
  }

  public async authRequest(request: any, response: any) {
    const authOrError = await this.usersModel.authenticateLogin(
      request,
      response,
    )
    return authOrError
  }
  public async validateTokenRequest(request: any, response: any) {
    const authOrError = await this.usersModel.validateTokenRequest(
      request,
      response,
    )
    return authOrError
  }
}
