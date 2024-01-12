import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Users } from './users'
import { CommonEntity } from './common/common-entity'
import { DateTime } from 'luxon'

@Entity()
export class Todos extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  title: string

  @Column('text')
  description: string

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: number

  @Column()
  completed: boolean

  @Column('timestamp with time zone', { nullable: true })
  dueDate: Date | null
  todo: DateTime<true>
}
