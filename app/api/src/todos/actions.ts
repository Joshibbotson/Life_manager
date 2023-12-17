import { IsString, IsBoolean, IsDate } from 'class-validator'
import { DateTime } from 'luxon'

export class todosSchema {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  createdBy: string

  @IsDate()
  dueDate: DateTime | null

  @IsBoolean()
  completed: boolean
}
