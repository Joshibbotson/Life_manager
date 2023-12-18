import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @OneToOne(() => Users, (users) => users.id)
  @JoinColumn()
  createdBy: string

  @OneToOne(() => Users, (users) => users.id)
  @JoinColumn()
  assignedTo: number

  @Column()
  completed: boolean
}
