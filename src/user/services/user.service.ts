import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserI } from '../models/user.interface';
import { AuthService } from 'src/auth/auth.service';
import {
  changePasswordDto,
  LoginUserDto,
  updateUserDto,
  CreateUserDto,
} from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async create(newUser: UserI): Promise<UserI> {
    try {
      const exists: boolean = await this.mailExists(newUser.email);
      const confirmPassword: boolean = await this.confirm(
        newUser.password,
        newUser.passwordConfirm,
      );
      if (!confirmPassword) {
        throw new HttpException('Password not confirm', HttpStatus.BAD_REQUEST);
      }
      if (!exists && confirmPassword) {
        const passwordHash: string = await this.hashPassword(newUser.password);
        newUser.password = passwordHash;
        const user = await this.userModel.create(newUser);
        return this.findOne(user.id);
      } else {
        throw new HttpException('Email is exited', HttpStatus.BAD_REQUEST);
      }
    } catch {
      throw new HttpException(
        'Email is exited or password is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: LoginUserDto): Promise<string> {
    try {
      const foundUser: UserI = await this.findByEmail(user.email.toLowerCase());
      if (foundUser) {
        const matches: boolean = await this.validatePassword(
          user.password,
          foundUser.password,
        );
        if (matches) {
          const payload: UserI = await this.findOne(foundUser._id);
          return this.authService.generateJwt(payload);
        } else {
          throw new HttpException(
            'Login was not successfull, wrong credentials',
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          'Login was not successfull, wrong credentials',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async changePassword(id: string, data: changePasswordDto): Promise<any> {
    try {
      const foundUser: UserI = await this.findOne(id);
      if (foundUser) {
        const matches: boolean = await this.validatePassword(
          data.password,
          foundUser.password,
        );
        const confirmPasswordNew = await this.confirm(
          data.passwordNew,
          data.passwordConfirm,
        );
        if (matches && confirmPasswordNew) {
          const passwordNew: string = await this.hashPassword(data.passwordNew);
          const userNew = await this.userModel.findByIdAndUpdate(id, {
            password: passwordNew,
          });
          return userNew;
        }
      } else {
        throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
      }
    } catch {
      throw new HttpException('Change Failed', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, newValue: updateUserDto): Promise<UserI> {
    return await this.userModel
      .findByIdAndUpdate(id, newValue, {
        new: true,
      })
      .exec();
  }

  // helper
  private async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  async findAll(options?: any): Promise<User[]> {
    const users = await this.userModel.find(options).exec();
    const serializedUsers = users.map((user) => {
      return user.schema.methods.serialize(user);
    });

    return serializedUsers;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  public async findOne(id: string): Promise<UserI> {
    return this.userModel.findById(id);
  }

  async delete(id: number): Promise<User | null> {
    return await this.userModel.findByIdAndRemove(id).exec();
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  private async hashPassword(password: string): Promise<string> {
    return this.authService.hashPassword(password);
  }

  private async confirm(
    password: string,
    passwordConfirm: string,
  ): Promise<boolean> {
    return password === passwordConfirm;
  }
}
