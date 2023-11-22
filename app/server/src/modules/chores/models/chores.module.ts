import { choresSchema } from '../../../../../api/dist/chores/actions'
import { Validate } from '../../../../../api/dist/validation/validate'
import { AppDataSource } from '../../../data-source'
import { ChoresEntity } from '../../../entities/chores'
import { Users } from '../../../entities/common/users'

export class ChoresModel {
  public static readonly moduleName: string = 'ChoresModel'
  public readonly validate: Validate

  constructor(validate: Validate) {
    this.validate = validate
  }

  public async create(request: any, response: any) {
    const post = await this.postChore(request, response)
    return post
  }

  public async read(request: any, skip: number, take: number) {
    if (request.params.id) {
      return this.getChoreById(request)
    }
    return this.getChores(skip, take)
  }

  public async update(request: any, response: any) {
    return this.updateChoreById(request, response)
  }

  public async delete(request: any, response: any) {
    return this.deleteChoreById(request, response)
  }

  private async postChore(req: any, res: any) {
    console.log('post')
    try {
      const chore = new ChoresEntity()
      const user = await AppDataSource.getRepository(Users).findOneBy({
        id: 1,
      })
      const payload = req.body
      chore.name = payload.name
      chore.description = payload.description
      chore.assignedTo = payload.assignedTo
      chore.createdBy = payload.createdBy
      chore.completed = payload.completed
      chore.user = user
      chore.deleted = false
      chore.createdDate = new Date()
      chore.editedDate = new Date()
      const readOrError = await this.validate.validateSchema(
        chore,
        choresSchema,
      )
      if (readOrError) {
        console.log(readOrError)
        const read = await AppDataSource.getRepository(ChoresEntity).save(chore)
        return read
      } else {
        console.log('failed schema validation')
      }
    } catch (error) {
      console.error('Error posting chores', error)
      res.status(500).send('Internal Server Error')
    }
  }

  private async getChores(skip: number, take: number) {
    try {
      const choreRepository = AppDataSource.manager.getRepository(ChoresEntity)
      console.log('skip:', skip)
      console.log('take:', take)
      const chores = await choreRepository.findAndCount({
        skip: skip,
        take: take,
        where: {
          deleted: false,
        },
      })
      const choresData = {
        skip: skip,
        take: take,
        count: chores[1],
        data: chores[0],
      }

      return choresData
    } catch (error) {
      console.error('Error fetching chores', error)
      throw new Error('Internal Server Error')
    }
  }

  private async getChoreById(request) {
    console.log('got chore by id')
    try {
      const id: number = request.params.id
      const choreRepository = AppDataSource.manager.getRepository(ChoresEntity)
      const chore = await choreRepository.findOne({
        where: {
          id: id,
        },
      })
      if (!chore) {
        request.status(500).send('Chore not found')
      }
      return chore
    } catch (error) {
      console.error('Error fetching chore', error)
      request.status(500).send('Internal Server Error')
    }
  }

  private async deleteChoreById(req, res) {
    try {
      const chore = await AppDataSource.getRepository(ChoresEntity).findOneBy({
        id: req.body.id,
      })
      chore.deleted = true
      await AppDataSource.getRepository(ChoresEntity).save(chore)
      return chore
    } catch (error) {
      console.error('Error fetching chores', error)
      res.status(500).send('Internal Server Error')
    }
  }

  private async updateChoreById(req, res) {
    try {
      const chore = await AppDataSource.getRepository(ChoresEntity).findOneBy({
        id: req.body.id,
      })
      chore.completed = true
      await AppDataSource.getRepository(ChoresEntity).save(chore)
      return chore
    } catch (error) {
      console.error('Error fetching chores', error)
      res.status(500).send('Internal Server Error')
    }
  }
}
