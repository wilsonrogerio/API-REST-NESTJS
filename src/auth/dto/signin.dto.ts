import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  private constructor(email, password) {
    this.email = email
    this.password = password
  }
}