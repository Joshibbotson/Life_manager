import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Users } from './users.entity'
import { CommonEntity } from './common/common-entity'

@Entity()
export class Todos extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string

  @Column('text')
  description: string

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users

  @Column({ type: 'timestamp', nullable: true })
  completedDate: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  updateCompletedDate() {
    if (this.completed) {
      this.completedDate = new Date();
    } else {
      this.completedDate = null;
    }
  }

  @Column({type: 'boolean'})
  completed: boolean

  // TODO implement projects / way of organising todos
  // @Column()
  // project

  @Column('timestamp with time zone', { nullable: true })
  dueDate: Date | null
}
