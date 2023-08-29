
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users";

@Entity()
export class Chores {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  name: string

  @Column("text")
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