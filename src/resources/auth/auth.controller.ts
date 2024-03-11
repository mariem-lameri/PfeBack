
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Body, Post, Res } from '@nestjs/common/decorators/http';
import { Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService  ,private jwtService: JwtService,
     private configService: ConfigService) {

  }

  @Post('login')
 async signin(@Body() signInDto: SignInDto,@Res() response: Response) {
  let foundUser= await this.authService.login(signInDto);
  if(foundUser!== null){
    let access_token = this.jwtService.sign({ userId: foundUser._id,userName:foundUser.email }, {
      secret: this.configService.get("JWT_SECRET_KEY")
    });
    response.status(HttpStatus.OK).json({ access_token , me: foundUser });
  }
  else {response.status(HttpStatus.NOT_FOUND).send();
  }

    //return this.authService.login(signInDto);
  }
  
}