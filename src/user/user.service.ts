import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import { Users } from './entity/user.entity';
import { User, UserDocument } from './schema/user.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { OtpService } from 'src/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private otpSerivce: OtpService,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

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
    // user.name = createUserDto.name;
    // user.email = createUserDto.email;
    // user.password = createUserDto.password;
    // user.isVerified = createUserDto.isVerified;
    const otp = await this.otpSerivce.create();
    this.mailerService.sendMail({
      from: 'safiullah.eb19102107@gmil.com',
      to: user.email,
      text: `your otp verfication code is:${otp}`,
    });
    const res = await this.userRepository.save(user);
    console.log({ otp, res:[res.id,res.email] });
    const payload = { email: res.email, sub: res.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
