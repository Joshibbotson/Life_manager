import { IsString, IsBoolean, IsArray } from 'class-validator'

export class CreateUsersSchema {
  @IsString()
  name: string

  @IsString()
  email: string

  @IsString()
  hashedPassword: string

  @IsBoolean()
  active: boolean

  @IsString()
  locale: string

  @IsBoolean()
  admin: boolean

  @IsArray()
  permissions: string[]
}

export class ReadUsersSchema {
  @IsString()
  name: string

  @IsString()
  email: string

  @IsBoolean()
  active: boolean

  @IsString()
  locale: string

  @IsBoolean()
  admin: boolean

  @IsArray()
  permissions: string[]
}
