import { UsersModel } from '../models/users.module'

export class UsersController {
  public static readonly moduleName: string = 'UsersController'

  private readonly usersModel: UsersModel

  constructor(usersModel: UsersModel) {
    this.usersModel = usersModel
  }

  public async createRequest(request: any) {
    try {
      const post = await this.usersModel.createUser(request.body)
      return post
    } catch (error) {
      throw error
    }
  }

  public async readRequest(request: any) {
    try {
      const skip = request.query.skip ? parseInt(request.query.skip, 10) : 0
      const take = request.query.take ? parseInt(request.query.take, 10) : 10
      if (Object.keys(request.query).includes('term')) {
        const data = await this.usersModel.searchUsers(request.query.term, take)
        return data
      }
      if (request.params.id) {
        return await this.usersModel.getUserById(request)
      }
      return await this.usersModel.getUsers(skip, take)
    } catch (error) {
      throw error
    }
  }

  // should have permissions setup here
  public async updateRequest(request: any) {
    try {
      // const updateOrError = await this.usersModel.updatedUserById(request.body.id)
      // return updateOrError
    } catch (error) {
      throw error
    }
  }

  // should have permissions setup here
  public async deleteRequest(request: any) {
    try {
      const deleteOrError = await this.usersModel.deleteUserById(
        request.body.id,
      )
      return deleteOrError
    } catch (error) {
      throw error
    }
  }

  public async authRequest(request: any) {
    try {
      const { email, password } = request.body

      const authOrError = await this.usersModel.authenticateLogin(
        email,
        password,
      )
      return authOrError
    } catch (error) {
      throw error
    }
  }

  public async validateTokenRequest(request: any) {
    try {
      const { token } = request.body
      const authOrError = await this.usersModel.validateTokenRequest(token)
      return authOrError
    } catch (error) {
      throw error
    }
  }
}
