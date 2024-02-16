import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty  } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty() 
  firstname: string;

  @ApiProperty()
  @IsNotEmpty() 
  lastname: string;

  @ApiProperty()
  @IsNotEmpty() 
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty() 
  password: string;

  @ApiProperty()
  @IsNotEmpty() 
  roles: string[];
}
