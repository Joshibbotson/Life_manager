import { IsString, IsBoolean, IsDate, IsNumber } from 'class-validator'
import { DateTime } from 'luxon'

export class todosSchema {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  createdBy: string

  @IsNumber()
  assignedTo: string

  @IsDate()
  dueDate: DateTime | null

  @IsBoolean()
  completed: boolean
}
