import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginUserDto, CreateUserDto } from '../dto/user.dto';
import { UserI } from '../models/user.interface';
import { UsersService } from '../services/user.service';
import { UserHelperService } from '../services/user-helper/user-helper.service';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private userHelperService: UserHelperService,
  ) {}

  @ApiOperation({ summary: 'sign up' })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    const userEntity: UserI =
      this.userHelperService.createUserDtoToEntity(createUserDto);
    return this.userService.create(userEntity);
  }

  @ApiOperation({ summary: 'sign in' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const jwt: string = await this.userService.login(loginUserDto);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 10000,
    };
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOperation({ summary: 'get profile' })
  @Get('profile')
  async getProfile(@Req() req: any) {
    const result = req.userInfo.user;
    delete result.password;
    return result;
  }
}
