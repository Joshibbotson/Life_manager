import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./common/common-entity";
import { Todos } from "./todos.entity";

@Entity()
export class Directory extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string

  @ManyToOne(() => Directory, directory => directory.childDirectories, { nullable: true })
  parentDirectory: Directory | null
  
  @OneToMany(() => Directory, (directory) => directory.parentDirectory)
  childDirectories: Directory[]

  @OneToMany(() => Todos, (todo) => todo.directory)
  childTodos: Todos[] 
}