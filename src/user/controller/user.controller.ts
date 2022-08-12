import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginUserDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import { UsersService } from '../services/user.service';
import { AuthService } from '../../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUser: User, @Req() request) {
    console.log(request.userInfo);
    return await this.authService.register(createUser);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
