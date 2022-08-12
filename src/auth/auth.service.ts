import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/services/user.service';
import { LoginUserDto } from '../user/dto/user.dto';
import { User } from '../user/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(userDto: User) {
    const user = await this.userService.create(userDto);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    return user;
  }
}
