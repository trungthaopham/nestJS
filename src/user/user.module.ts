import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserSchema } from './models/user.model';
import { UsersService } from './services/user.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from 'src/auth/jwt/jwt.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService],
})
export class UserModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude(
    //     { path: 'login', method: RequestMethod.POST },
    //     { path: 'register', method: RequestMethod.POST },
    //     'user/(.*)',
    //   )
    //   .forRoutes(UserController);
  }
}
