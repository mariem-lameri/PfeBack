import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto } from '../auth/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

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
      return await this.userModel.findOne({ email }).select("-password").lean();
    }
    return null;
  }

  async login(user: SignInDto) {
    const foundUser = await this.validateUser(user)
    const payload = { email: user.email };
    return { access_token: this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET_KEY")
    }), me: foundUser };
  }
}