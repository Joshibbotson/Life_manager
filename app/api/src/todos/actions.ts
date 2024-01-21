import { IsString, IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator'
import { IUserReadRequest } from '../users'
import { DateTime } from 'luxon'

export class CreateTodoSchema {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  createdBy: number

  @IsOptional()
  @IsDate()
  dueDate: Date | null

  @IsBoolean()
  completed: boolean
}

export class ReadTodoSchema {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  createdBy: IUserReadRequest

  @IsDate()
  dueDate: DateTime | null

  @IsBoolean()
  completed: boolean
}
