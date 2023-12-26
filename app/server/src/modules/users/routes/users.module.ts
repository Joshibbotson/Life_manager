import { server } from '../../..'
import { UsersController } from '../controllers/users.module'

enum UserErrors {
  createUserError = 'Error creating user: ',
  readUserError = 'Error reading user: ',
  readUsersError = 'Error reading users: ',
  updateUserError = 'Error updating user: ',
  deleteUserError = 'Error deleting user: ',
  authUserError = 'Error authenticating user: ',
  validateTknError = 'Error validating token: ',
}

export class UsersRoutes {
  public static readonly moduleName: string = 'UsersRoutes'
  private usersController: UsersController

  constructor(usersController: UsersController) {
    this.usersController = usersController
  }

  private readonly createRoute = this.createHandler(server)
  private readonly readRoute = this.readHandler(server)
  private readonly updateRoute = this.updateHandler(server)
  private readonly deleteRoute = this.deleteHandler(server)
  private readonly authRoute = this.authHandler(server)
  private readonly validateTknRoute = this.validateTokenHandler(server)

  // Handle creation of user, return login token.
  protected createHandler(server: any) {
    return server.post('/user/newuser', async (req, res, next) => {
      try {
        const post = await this.usersController.createRequest(req)
        return res.status(201).json(post)
      } catch (error) {
        if (Array.isArray(error)) {
          return res.status(500).json({ validationError: error })
        } else {
          const errorMessage = error.message || 'Unknown error occurred'
          res
            .status(500)
            .json({ error: UserErrors.createUserError + errorMessage })
        }
      }
    })
  }

  /** Read route */
  protected readHandler(server: any) {
    server.get('/user/read', async (req, res, next) => {
      try {
        const read = await this.usersController.readRequest(req)
        res.status(200).json(read)
      } catch (error) {
        res
          .status(500)
          .json({ error: UserErrors.readUsersError + error.message })
      }
    })

    server.get('/user/read/:id', async (req, res, next) => {
      try {
        const read = await this.usersController.readRequest(req)
        res.status(200).json(read)
      } catch (error) {
        res
          .status(500)
          .json({ error: UserErrors.createUserError + error.message })
      }
    })
  }

  // TODO: complete this.
  protected updateHandler(server: any) {
    console.log('update called')
    return server.put('/user/update/:id', async (req, res, next) => {
      try {
        const updateRequest = await this.usersController.updateRequest(req)
        res.status(202).json(updateRequest)
      } catch (error) {
        res
          .status(500)
          .json({ error: UserErrors.updateUserError + error.message })
      }
    })
  }

  protected deleteHandler(server: any) {
    return server.put('/user/delete/:id', async (req, res, next) => {
      try {
        const deleteRequest = await this.usersController.deleteRequest(req)
        res.status(200).json(deleteRequest)
      } catch (error) {
        res
          .status(500)
          .json({ error: UserErrors.deleteUserError + error.message })
      }
    })
  }

  // authentication request, should return login token + user.name
  protected authHandler(server: any) {
    server.post('/user/login', async (req, res, next) => {
      try {
        const authReq = await this.usersController.authRequest(req)
        res.status(202).json(authReq)
      } catch (error) {
        res
          .status(500)
          .json({ error: UserErrors.authUserError + error.message })
      }
    })
  }

  // validate token request, should return valid boolean
  protected validateTokenHandler(server: any) {
    server.post('/user/validateToken', async (req, res, next) => {
      try {
        const validateTknReq =
          await this.usersController.validateTokenRequest(req)
        if (typeof validateTknReq === 'string') {
          res.status(201).json({ valid: false, message: 'Invalid token' })
        } else if (validateTknReq) {
          res.status(200).json({ valid: true, message: 'Token is valid' })
        }
      } catch (error) {
        res
          .status(500)
          .json({ error: UserErrors.validateTknError + error.message })
      }
    })
  }
}
