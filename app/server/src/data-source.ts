import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Users } from './entities/users.entity'
import { Todos } from './entities/todos.entity'
import { config } from 'dotenv'
import { Todos1694330560997 } from './migration/1694330560997-todos'
import { Users1701508320209 } from './migration/1701508320209-users'
import { fileURLToPath } from 'url'
import path from 'path'
import { Directory } from './entities/directory.entity'
import { Directory1706559713447 } from './migration/1706559713447-directory'
import { PostgresFts1706734398818 } from './migration/1706734398818-postgres-fts'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: __dirname + '/../../../.env' })

const productionConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Users, Todos, Directory],
  migrations: [Users1701508320209, Todos1694330560997, Directory1706559713447, PostgresFts1706734398818],
  subscribers: [],
}

const developmentConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'life-manager-postgres',
  port: parseInt(process.env.DB_PORT, 10),
  username: 'postgres',
  password: 'lifemanager',
  database: 'postgres',
  synchronize: true, // this is unsafe in production, as it could wipe clean production tables if an entity is changed.
  logging: true,
  entities: [Users, Todos, Directory],
  migrations: [Users1701508320209, Todos1694330560997, Directory1706559713447, PostgresFts1706734398818],
  subscribers: [],
}

const dataSourceConfig =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig

export const AppDataSource = new DataSource(dataSourceConfig)

AppDataSource.initialize()
