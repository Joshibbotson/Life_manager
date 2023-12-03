import { usersSchema } from '../../../../../api/dist/users/actions'
import { Validate } from '../../../../../api/dist/validation/validate'
import { AppDataSource } from '../../../data-source'
import { Users } from '../../../entities/common/users'
import { bcrypt } from 'bcrypt'
import { jwt } from 'jsonwebtoken'
export class UsersModel {
  public static readonly moduleName: string = 'UsersModel'
  public readonly validate: Validate

  constructor(validate: Validate) {
    this.validate = validate
  }

  // create user
  public async create(request: any, response: any) {
    const newUser = await this.createUser(request, response)
    return newUser
  }

  // read users/specific userId
  public async read(request: any, skip: number, take: number) {
    if (request.params.id) {
      return this.getUserById(request)
    }
    return this.getUsers(skip, take)
  }

  //update user
  // public async update(request: any, response: any) {
  //   return this.updateUserById(request, response)
  // }

  //soft delete user
  public async delete(request: any, response: any) {
    return this.deleteUserById(request, response)
  }

  private async createUser(req: any, res: any) {
    console.log('createUser')
    try {
      const payload = req.body
      const checkExistingUser = await AppDataSource.getRepository(
        Users,
      ).findOneBy({ email: payload.email })

      if (checkExistingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists',
          status: 409,
        })
      }
      const salt = bcrypt.genSaltSync(10)
      const password = await bcrypt.hash(payload.password, salt)

      const user = new Users()
      user.name = payload.name
      user.active = true
      user.email = payload.email
      user.hashedPassword = password
      user.permissions = []
      user.deleted = false
      user.createdDate = new Date()
      user.editedDate = new Date()
      const readOrError = await this.validate.validateSchema(user, usersSchema)

      if (readOrError) {
        const read = await AppDataSource.getRepository(Users).save(user)
        console.log('create user read:', read)
        return read
      } else {
        console.log('failed schema validation')
      }
    } catch (error) {
      console.error('Error posting users', error)
      res.status(500).send('Internal Server Error')
    }
  }

  private async getUsers(skip: number, take: number) {
    try {
      const choreRepository = AppDataSource.manager.getRepository(Users)
      console.log('skip:', skip)
      console.log('take:', take)
      const users = await choreRepository.findAndCount({
        skip: skip,
        take: take,
        where: {
          deleted: false,
        },
      })
      const usersData = {
        skip: skip,
        take: take,
        count: users[1],
        data: users[0],
      }

      return usersData
    } catch (error) {
      console.error('Error fetching users', error)
      throw new Error('Internal Server Error')
    }
  }

  private async getUserById(request) {
    console.log('got chore by id')
    try {
      const id: number = request.params.id
      const choreRepository = AppDataSource.manager.getRepository(Users)
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

  private async deleteUserById(req, res) {
    try {
      const chore = await AppDataSource.getRepository(Users).findOneBy({
        id: req.body.id,
      })
      chore.deleted = true
      await AppDataSource.getRepository(Users).save(chore)
      return chore
    } catch (error) {
      console.error('Error fetching users', error)
      res.status(500).send('Internal Server Error')
    }
  }

  // private async updateUserById(req, res) {
  //   try {
  //     const chore = await AppDataSource.getRepository(Users).findOneBy({
  //       id: req.body.id,
  //     })
  //     chore.completed = true
  //     await AppDataSource.getRepository(Users).save(chore)
  //     return chore
  //   } catch (error) {
  //     console.error('Error fetching users', error)
  //     res.status(500).send('Internal Server Error')
  //   }
  // }

  public async authenticateLogin(req, res) {
    try {
      const { email, password } = req.body

      const result = await AppDataSource.getRepository(Users).findOneBy({
        email: email,
      })

      const isMatch = await bcrypt.compare(password, result.hashedPassword)

      if (isMatch) {
        const loginTkn = this.generateLoginToken(email)
        return res.status(200).json({
          success: true,
          token: loginTkn,
          user: { name: result.name, email: result.email },
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'user failed to register',
      })
    }
  }

  public async validateTokenRequest(req, res) {
    try {
      console.log(req.body)
      const { token } = req.body
      const decoded = await jwt.verify(token, process.env.SECRET_WEBTKNKEY)

      if (decoded) {
        res.json({ valid: true })
      }
    } catch (error) {
      res.json({ valid: false })
    }
  }

  private generateLoginToken(email: string): string {
    return jwt.sign({ email }, process.env.SECRET_WEBTKNKEY, {
      expiresIn: '1h',
    })
  }
}
