import { Like } from 'typeorm'
import { usersSchema } from '../../../../../api/dist/users/actions'
import { Validate } from '../../../../../api/dist/validation/validate'
import { AppDataSource } from '../../../data-source'
import { Users } from '../../../entities/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
      // const payload = req.query
      console.log(payload)
      const checkExistingUser = await AppDataSource.getRepository(
        Users,
      ).findOneBy({ email: payload.email })

      if (checkExistingUser) {
        return {
          success: false,
          message: 'Email already exists',
          status: 409,
        }
      }

      const salt = bcrypt.genSaltSync(10)
      const password = await bcrypt.hash(payload.password, salt)

      const user = new Users()
      user.name = payload.name
      user.locale = payload.locale
      user.active = true
      user.email = payload.email
      user.hashedPassword = password
      user.permissions = []

      const readOrError = await this.validate.validateSchema(user, usersSchema)

      if (readOrError) {
        const read = await AppDataSource.getRepository(Users).save(user)
        console.log('create user read:', read)
        return this.authenticateLogin(
          { body: { email: payload.email, password: payload.password } },
          {},
        )
        // return read
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
      const todoRepository = AppDataSource.manager.getRepository(Users)
      console.log('skip:', skip)
      console.log('take:', take)
      const users = await todoRepository.findAndCount({
        skip: skip,
        take: take,
        where: {
          deletedDate: null,
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
    console.log('got todo by id')
    try {
      const id: number = request.params.id
      const todoRepository = AppDataSource.manager.getRepository(Users)
      const todo = await todoRepository.findOne({
        where: {
          id: id,
        },
      })
      if (!todo) {
        request.status(500).send('Todo not found')
      }
      return todo
    } catch (error) {
      console.error('Error fetching todo', error)
      request.status(500).send('Internal Server Error')
    }
  }

  private async deleteUserById(req, res) {
    try {
      const todo = await AppDataSource.getRepository(Users).findOneBy({
        id: req.body.id,
      })

      await AppDataSource.getRepository(Users).save(todo)
      return todo
    } catch (error) {
      console.error('Error fetching users', error)
      res.status(500).send('Internal Server Error')
    }
  }

  // private async updateUserById(req, res) {
  //   try {
  //     const todo = await AppDataSource.getRepository(Users).findOneBy({
  //       id: req.body.id,
  //     })
  //     todo.completed = true
  //     await AppDataSource.getRepository(Users).save(todo)
  //     return todo
  //   } catch (error) {
  //     console.error('Error fetching users', error)
  //     res.status(500).send('Internal Server Error')
  //   }
  // }

  // refactor this...?
  public async authenticateLogin(req, res) {
    try {
      const { email, password } = req.body
      console.log(email, password)
      const result = await AppDataSource.getRepository(Users).findOneBy({
        email: email,
      })
      if (!result) {
        return res.status(500).json({
          success: false,
          message: 'user email does not exist',
        })
      }
      console.log(result)
      const isMatch = await bcrypt.compare(password, result.hashedPassword)

      if (isMatch) {
        console.log('gen log in token')
        const loginTkn = this.generateLoginToken(email)
        console.log('gen log in token post: ', loginTkn)

        return {
          success: true,
          token: loginTkn,
          user: { name: result.name, email: result.email },
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'user failed to login',
      })
    }
  }

  public async validateTokenRequest(req, res) {
    try {
      console.log(req.body)
      const { token } = req.body
      const decoded = await jwt.verify(token, process.env.SECRET_WEBTKNKEY)

      return decoded
    } catch (error) {
      console.log(error.expiredAt)
      if (error.expiredAt) {
        return String(`Token Expired at: ${error.expiredAt}`)
      }
      return error
    }
  }

  private generateLoginToken(email: string): string {
    return jwt.sign({ email }, process.env.SECRET_WEBTKNKEY, {
      expiresIn: '24h',
    })
  }

  public async searchUsers(req: any, response: any, take: number) {
    const searchTerm = req.query.term

    if (!searchTerm) {
      return response.status(400).json({
        success: false,
        message: 'Search term is required',
      })
    }
    try {
      const userRepository = AppDataSource.getRepository(Users)
      return userRepository.find({
        where: { name: Like(`%${searchTerm}`) },
        take: take,
      })
    } catch (error) {
      return response.status(500).json({})
    }
  }
}
