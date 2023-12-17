import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Users } from './users'
import { CommonEntity } from './common/common-entity'

@Entity()
export class Todos extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  name: string

  @Column('text')
  description: string

  @Column()
  createdBy: string

  @Column()
  assignedTo: string

  @Column()
  completed: boolean

  @ManyToOne(() => Users, (users) => users.id)
  @JoinColumn()
  user: Users
}
