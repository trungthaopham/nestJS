import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../user/models/user.model';
import { JwtService } from '../../auth/jwt/jwt.service';

declare module 'express' {
  export interface Request {
    userInfo: any;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;

    if (token && token.split(' ')[0] === 'Bearer') {
      const user: User = await this.jwtService.verify(token);
      req.userInfo = user;
      // req.userInfo.token = token;
      next();
    } else {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
