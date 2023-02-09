import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { forwardRef } from '@nestjs/common/utils';
import { Inject } from '@nestjs/common/decorators';
import { OtpService } from 'src/otp/otp.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(
    // private userService: UserService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => OtpService))
    private readonly otpSerivce: OtpService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'user does not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;
    if (!user.isVerified) {
      const res = await this.otpSerivce.create(email);
      await this.userService.update(user.id, { otpId: res.id });
      // user.otpId = res.id;
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
