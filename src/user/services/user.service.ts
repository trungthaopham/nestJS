import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    // // check exists
    // const userInDb = await this.UserModel.findOne({ email: user.email });
    // if (userInDb) {
    //   throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    // }

    const createdUser = new this.UserModel(user);

    return await createdUser.save();
  }

  async findAll(options?: any): Promise<User[]> {
    const users = await this.UserModel.find(options).exec();
    const serializedUsers = users.map((user) => {
      return user.schema.methods.serialize(user);
    });

    return serializedUsers;
  }

  async findById(id: string): Promise<User | null> {
    let user = await this.UserModel.findById(id).exec();

    if (user) {
      user = user.schema.methods.serialize(user);
    }

    return user;
  }

  async findOne(
    options: any,
    fields?: any,
    isSerialized?: boolean,
  ): Promise<User | null> {
    let user = await this.UserModel.findOne(options, fields).exec();
    if (user && isSerialized) {
      user = user.schema.methods.serialize(user);
    }

    return user;
  }

  async update(id: number, newValue: User): Promise<User | null> {
    return await this.UserModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: number): Promise<User | null> {
    return await this.UserModel.findByIdAndRemove(id).exec();
  }

  async findByEmail(email) {
    return await this.UserModel.findOne({ email: email });
  }
}
