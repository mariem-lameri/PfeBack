import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({signOptions: { expiresIn: '60m'},}),
UsersModule
  ],
  providers: [AuthService, JwtService,JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, JwtService],
})
export class AuthModule {}
