import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'invalid email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isVerified?: boolean=false;

  @IsOptional()
  otpId: string;
}
