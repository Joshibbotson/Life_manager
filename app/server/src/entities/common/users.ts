import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { CommonEntity } from './common-entity'

@Entity()
export class Users extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  userName: string

  @Column()
  password: string

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
}
