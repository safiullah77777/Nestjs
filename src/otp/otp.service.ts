import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from './schema/otp.schema';

@Injectable()
export class OtpService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
  ) {}

  async createOtp() {
    const otpNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt();
    const optHash = await bcrypt.hash(otpNumber, salt);
    const otp = await this.otpModel.create({
      otp: optHash,
    });
  }
}
