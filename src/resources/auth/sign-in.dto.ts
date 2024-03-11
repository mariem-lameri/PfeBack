
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { isValidObjectId } from 'mongoose';


export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
