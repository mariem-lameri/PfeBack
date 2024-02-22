import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(){}
    use(req: any, res: Response, next: NextFunction) {
        console.log(req.headers.authorization);
        next();
      }
}