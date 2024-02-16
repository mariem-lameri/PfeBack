import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '65FCFC736969D43CFBCE06843383F2FDC99CAC07D6ECEA7D07B13934D67B14C8', // Utilisez une variable d'environnement pour votre secret en production
      signOptions: { expiresIn: '60s' }, // Durée de vie du token
    }),
UsersModule
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtModule, JwtService],
})
export class AuthModule {}
