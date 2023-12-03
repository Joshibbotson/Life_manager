import { server } from '../../..'
import { UsersController } from '../controllers/users.module'

export class ChoresRoutes {
  public static readonly moduleName: string = 'ChoresRoutes'

  private usersController: UsersController

  constructor(usersController: UsersController) {
    this.usersController = usersController
  }

  private readonly createRoute = this.createHandler(server)
  private readonly readRoute = this.readHandler(server)
  private readonly updateRoute = this.updateHandler(server)
  private readonly deleteRoute = this.deleteHandler(server)
  private readonly authRoute = this.authHandler(server)

  // Handle creation of user, return login token.
  protected createHandler(server: any) {
    console.log('createHandler')
    return server.post('/user/create', async (req, res, next) => {
      try {
        const post = await this.usersController.createRequest(req, res)
        console.log(post)
        res.json(post)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })
  }

  /** Read route */
  protected readHandler(server: any) {
    server.get('/user/read', async (req, res, next) => {
      const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0
      const take = req.query.take ? parseInt(req.query.take, 10) : 10
      console.log('skip route:', skip)
      console.log('take route:', take)

      try {
        const read = await this.usersController.readRequest(req, skip, take)
        console.log('returned read pre json: ', read)
        res.json(read)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })

    server.get('/user/read/:id', async (req, res, next) => {
      const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0
      const take = req.query.take ? parseInt(req.query.take, 10) : 10
      console.log('Read by id: ', req.query)
      try {
        const read = await this.usersController.readRequest(req, skip, take)
        console.log('returned read pre json: ', read)

        res.json(read)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })
  }

  protected updateHandler(server: any) {
    console.log('update called')
    return server.put('/user/update/:id', async (req, res, next) => {
      try {
        const updateRequest = await this.usersController.updateRequest(req, res)
        console.log('Update req!:', updateRequest)
        res.json(updateRequest)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Update Server Error' })
      }
    })
  }

  protected deleteHandler(server: any) {
    return server.put('/user/delete/:id', async (req, res, next) => {
      try {
        const deleteRequest = await this.usersController.deleteRequest(req, res)
        console.log(deleteRequest)
        res.json(deleteRequest)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Delete Server Error' })
      }
    })
  }

  // authentication request, should return login token + user.name
  protected authHandler(server: any) {
    return server.get('user/login', async (req, res, next) => {
      try {
        const authReq = await this.usersController.authRequest(req, res)
        console.log('authHandler, authReq:', authReq)
        res.json(authReq)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Auth Server Error' })
      }
    })
  }

  // validate token request, should return valid boolean
  protected validateTokenHandler(server: any) {
    return server.get('user/validateToken', async (req, res, next) => {
      try {
        const validatTknReq = await this.usersController.validateTokenRequest(
          req,
          res,
        )
        console.log('validateTknHandler, validateTkReq:', validatTknReq)
        res.json(validatTknReq)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Auth Server Error' })
      }
    })
  }
}
