import {  HttpStatus, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto } from '../auth/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Response } from 'express';

@Injectable()
export class AuthService {
  signIn: any;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser({ email, password }: SignInDto): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).lean();
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...userData } = user;
      return await this.userModel.findOne({ email,password }).select("-password").lean();
    }
    return user;
  }

  async login(user: SignInDto) {
   // const foundUser = await this.validateUser(user)
    //const payload = { userId: foundUser._id,userName:foundUser.email };
   
  //console.log(access_token);
 // return foundUser;
   // return { access_token , me: foundUser };
   return await this.userModel.findOne(user).select("-password").lean();
  }
}
