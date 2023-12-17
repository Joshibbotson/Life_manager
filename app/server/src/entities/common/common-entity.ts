import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity()
export abstract class CommonEntity {
  @DeleteDateColumn()
  deletedDate: Date

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @VersionColumn()
  version: number
}
