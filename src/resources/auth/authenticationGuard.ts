//import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      
      if (!token) {
        throw new UnauthorizedException('Aucun token fourni');
      }
     request.user = this.jwtService.verify(token);
      //const token = authHeader.split(' ')[1];
      //const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      // Ajoutez ici toute logique supplémentaire nécessaire après la vérification du token
      //return true; // ou retournez false si le token n'est pas valide
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token non valide ou expiré');
    }
    return true;
  }
}
