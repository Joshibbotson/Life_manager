import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { CommonEntity } from './common/common-entity'

@Entity()
export class Users extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  name: string

  @Column()
  email: string

  @Column()
  hashedPassword: string

  @Column()
  locale: string

  @Column()
  admin: boolean

  @Column('text', {
    array: true,
    default: [],
  })
  permissions: string[]

  @Column()
  active: boolean
}
