
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      // Including a detailed message with the exception
      throw new UnauthorizedException('Invalid credentials. Please check your username and password.');
    }

    const payload = { username: user.firstname, sub: user._id }; 
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}