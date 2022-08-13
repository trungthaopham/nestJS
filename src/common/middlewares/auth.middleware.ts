import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserI } from '../../user/models/user.interface';
import { AuthService } from 'src/auth/auth.service';
// import { UsersService } from 'src/user/services/user.service';

declare module 'express' {
  export interface Request {
    userInfo: any;
  }
}
export interface RequestModel extends Request {
  user: UserI;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    // private usersService: UsersService,
    private authService: AuthService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function) {
    try {
      const token = req.headers.authorization;
      const tokenArray = token.split(' ')[1];
      const decodedToken = await this.authService.verifyJwt(tokenArray);

      // const user: UserI = await this.usersService.findOne(
      //   decodedToken.user._id,
      // );
      if (decodedToken) {
        req.userInfo = decodedToken;
        next();
      } else {
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
      }
    } catch {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
