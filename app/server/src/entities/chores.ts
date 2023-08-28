
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PrimaryGeneratedColumnType } from "typeorm/driver/types/ColumnTypes";

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
}