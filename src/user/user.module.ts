import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './services/user.service';
import { AuthModule } from '../auth/auth.module';
import { UserHelperService } from './services/user-helper/user-helper.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService, UserHelperService],
  exports: [UsersService],
})
export class UserModule {}
