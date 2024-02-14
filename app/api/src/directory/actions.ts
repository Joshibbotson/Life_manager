import { IsString, IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator'
import { DateTime } from 'luxon'

export class CreateDirectorySchema {
  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  parentDirectory: number | null

  @IsOptional()
  @IsNumber()
  childDirectory: number[]
}

export class ReadDirectorySchema {
  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  parentDirectory: IDirectory | null

  @IsOptional()
  @IsNumber()
  childDirectory: IDirectory[]
}
