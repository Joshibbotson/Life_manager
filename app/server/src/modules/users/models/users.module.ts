import { IReadUser } from '../../../../../api/dist/users'
import { CreateUsersSchema } from '../../../../../api/dist/users/actions'
import { Validate } from '../../../../../api/dist/validation/validation'
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

  /** Create user */
  public async createUser(req: any) {
    try {
      const checkExistingUser = await AppDataSource.getRepository(
        Users,
      ).findOneBy({ email: req.email })

      if (checkExistingUser) {
        return {
          success: false,
          message: 'Email already exists',
          status: 409,
        }
      }
      const salt = bcrypt.genSaltSync(10)
      const password = await bcrypt.hash(req.password, salt)

      const user = new Users()
      user.name = req.name
      user.locale = req.locale
      user.active = true
      user.admin = false
      user.email = req.email
      user.hashedPassword = password
      user.permissions = []

      const readOrError = await this.validate.validateSchema(
        user,
        CreateUsersSchema,
      )

      if (typeof readOrError === 'string') {
        throw readOrError
      } else {
        const read = await AppDataSource.getRepository(Users).save(user)
        return this.authenticateLogin(req.email, req.password)
      }
    } catch (error) {
      throw error
    }
  }

  /** Get all users that aren't deleted with pagination. */
  public async getUsers(skip: number, take: number) {
    try {
      const todoRepository = AppDataSource.manager.getRepository(Users)
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
      throw error
    }
  }

  /** Get used via associated ID */
  public async getUserById(id: number) {
    try {
      const userRepository = AppDataSource.manager.getRepository(Users)
      const user = await userRepository.findOne({
        where: {
          id: id,
        },
      })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw error
    }
  }

  /** Search users via name */
  public async searchUsers(searchTerm: string, take: number) {
    if (!searchTerm) {
      throw new Error('Search term is required')
    }
    try {
      const userRepository = AppDataSource.getRepository(Users)
      const result = await userRepository
        .createQueryBuilder('user')
        .where('LOWER(user.name) LIKE :name', {
          name: `%${searchTerm.toLowerCase()}%`,
        })
        .take(take)
        .getMany()

      return {
        success: true,
        data: result,
      }
    } catch (error) {
      throw error
    }
  }

  /* Soft delete user. */
  public async deleteUserById(id: number) {
    try {
      await AppDataSource.getRepository(Users).softDelete({ id: id })
      const user = await AppDataSource.getRepository(Users).findOneBy({
        id: id,
      })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw error
    }
  }

  // TODO: Implement.
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

  /** Handle auth login */
  public async authenticateLogin(email: string, password: string) {
    console.log(email, password)
    try {
      const result = await AppDataSource.getRepository(Users)
        .createQueryBuilder('user')
        .addSelect('user.hashedPassword')
        .where('user.email = :email', { email })
        .getOne()
      if (!result) {
        throw {
          success: false,
          message: 'user email does not exist',
        }
      }
      const isMatch = await bcrypt.compare(password, result.hashedPassword)
      const removedPasswordUser = Object.fromEntries(
        Object.entries(result).filter((entry) => {
          return !entry.includes('hashedPassword')
        }),
      )

      if (isMatch) {
        const loginTkn = this.generateLoginToken(email)
        return {
          success: true,
          token: loginTkn,
          user: removedPasswordUser as IReadUser,
        }
      }
    } catch (error) {
      throw {
        success: false,
        message: error,
      }
    }
  }

  /** Handle web token validation */
  public async validateTokenRequest(token: string) {
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_WEBTKNKEY)
      return decoded
    } catch (error) {
      if (error.expiredAt) {
        throw String(`Token Expired at: ${error.expiredAt}`)
      }
      throw error
    }
  }

  /** Generate a fresh token */
  private generateLoginToken(email: string): string {
    return jwt.sign({ email }, process.env.SECRET_WEBTKNKEY, {
      expiresIn: '24h',
    })
  }
}
