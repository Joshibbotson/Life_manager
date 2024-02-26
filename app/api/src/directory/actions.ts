import { IsString,  IsNumber, IsOptional } from 'class-validator'

import { IDirectory } from './types'

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
