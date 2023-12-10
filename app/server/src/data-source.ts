import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Users } from './entities/common/users'
import { Chores } from './entities/chores'
import { config } from 'dotenv'
import { Chores1694330560997 } from './migration/1694330560997-chores'
import { Users1701508320209 } from './migration/1701508320209-users'

// if (process.env.NODE_ENV === 'production') {
//   config()
// }

config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'life-manager-postgres',
  port: parseInt(process.env.DB_PORT, 10),
  username: 'postgres',
  password: 'lifemanager',
  database: 'postgres',
  synchronize: true, // this is unsafe in production, as it could wipe clean production tables if an entity is changed.
  logging: false,
  entities: [Users, Chores],
  migrations: [Users1701508320209, Chores1694330560997], // migrations are going to update your tables correctly
  subscribers: [],
})
// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST || 'life-manager-postgres',
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME || 'postgres',
//   password: process.env.DB_PASSWORD || 'lifemanager',
//   database: process.env.DB_DATABASE || 'postgres',
//   synchronize: true, // this is unsafe in production, as it could wipe clean production tables if an entity is changed.
//   logging: false,
//   entities: [Users, Chores],
//   migrations: [Users1701508320209, Chores1694330560997], // migrations are going to update your tables correctly
//   subscribers: [],
// })

AppDataSource.initialize()
