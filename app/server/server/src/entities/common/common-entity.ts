import { Entity, Column } from 'typeorm'

@Entity()
export abstract class CommonEntity {
  @Column()
  deleted: boolean

  @Column()
  createdDate: Date

  @Column()
  editedDate: Date
}
