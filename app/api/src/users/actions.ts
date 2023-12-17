import { IsString, IsBoolean, IsArray } from 'class-validator'

export class usersSchema {
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

  @IsArray()
  permissions: string[]
}
