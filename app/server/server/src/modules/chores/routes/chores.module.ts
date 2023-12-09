import { Validate } from '../../../../../api/dist/validation/validate'
import { server } from '../../..'
import { ChoresController } from '../controller/chores.module'

export class ChoresRoutes {
  public static readonly moduleName: string = 'ChoresRoutes'

  private choresController: ChoresController

  constructor(choresController: ChoresController) {
    this.choresController = choresController
  }

  private readonly createRoute = this.createHandler(server)
  private readonly readRoute = this.readHandler(server)
  private readonly updateRoute = this.updateHandler(server)
  private readonly deleteRoute = this.deleteHandler(server)

  protected createHandler(server: any) {
    console.log('createHandler')
    return server.post('/chores/create', async (req, res, next) => {
      try {
        const post = await this.choresController.createRequest(req, res)
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
    server.get('/chores/read', async (req, res, next) => {
      const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0
      const take = req.query.take ? parseInt(req.query.take, 10) : 10
      console.log('skip route:', skip)
      console.log('take route:', take)

      try {
        const read = await this.choresController.readRequest(req, skip, take)
        console.log('returned read pre json: ', read)
        res.json(read)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })

    server.get('/chores/read/:id', async (req, res, next) => {
      const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0
      const take = req.query.take ? parseInt(req.query.take, 10) : 10
      console.log('Read by id: ', req.query)
      try {
        const read = await this.choresController.readRequest(req, skip, take)
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
    return server.put('/chores/update/:id', async (req, res, next) => {
      try {
        const updateRequest = await this.choresController.updateRequest(
          req,
          res,
        )
        console.log('Update req!:', updateRequest)
        res.json(updateRequest)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Update Server Error' })
      }
    })
  }

  protected deleteHandler(server: any) {
    return server.put('/chores/delete/:id', async (req, res, next) => {
      try {
        const deleteRequest = await this.choresController.deleteRequest(
          req,
          res,
        )
        console.log(deleteRequest)
        res.json(deleteRequest)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Delete Server Error' })
      }
    })
  }
}

const validate = new Validate()
