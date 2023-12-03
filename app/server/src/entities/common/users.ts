import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { CommonEntity } from './common-entity'

@Entity()
export class Users extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  hashedPassword: string

  @Column({
    length: 100,
  })
  name: string

  @Column()
  email: string

  @Column('text', {
    array: true,
    default: [],
  })
  permissions: string[]

  @Column()
  active: boolean
}
