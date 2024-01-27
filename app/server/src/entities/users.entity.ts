import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { CommonEntity } from './common/common-entity'

@Entity()
export class Users extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false
  })
  email: string

  @Column({ type: 'varchar',
  length: 200, select: false })
  hashedPassword: string

  @Column({
    type: 'varchar',
    length: 200,
  })
  locale: string

  @Column({type:'boolean'})
  admin: boolean

  @Column('text', {
    array: true,
    default: [],
  })
  permissions: string[]

  @Column({type:'boolean'})
  active: boolean
}
