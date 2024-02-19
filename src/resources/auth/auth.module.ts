import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/entities/user.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({}),
UsersModule
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtModule, JwtService],
})
export class AuthModule {}
