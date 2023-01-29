import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const alreadyUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (alreadyUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'user already exist',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.userModel.create(createUserDto);
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async get(params): Promise<User> {
    return await this.userModel.findById(params.id);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).select('+password');
  }

  async getById(user: any): Promise<User> {
    return await this.userModel.findById(user?._id);
  }

  async delete(_id): Promise<User> {
    return await this.userModel.findByIdAndRemove(_id);
  }

  async update(req: Request, id: string): Promise<User> {
    return (await this.userModel.findByIdAndUpdate(id, { ...req.body })).save();
  }
}
