import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { OtpService } from 'src/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    // private otpSerivce: OtpService, // private authService: AuthService,
    @Inject(forwardRef(() => OtpService))
    private readonly otpSerivce: OtpService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) // @Inject(forwardRef(() => JwtService)) private readonly jwtService: JwtService,

  {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const alreadyUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
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
    const user = new Users();
    Object.keys(createUserDto).forEach(
      (item) => (user[item] = createUserDto[item]),
    );
    const otp = await this.otpSerivce.create(createUserDto.email);
    user.otpId = otp.id;
    await this.userRepository.save(user);
    return this.authService.login({ id: user.id, email: user.email });
  }

  async getAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async get(params): Promise<Users> {
    return await this.userRepository.findOne({ where: { id: params.id } });
  }

  async getByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // async getById(id: number): Promise<Users> {
  //   return await this.userRepository.findOne({
  //     where: { id },
  //   });
  // }

  async delete(id): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.userRepository.update(id, updateUserDto);
  }
}
