import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/bcrypt';
import { Repository } from 'typeorm';
import { Otp } from './entity/otp.entity';
// import { Otp } from './schema/otp.entity';

@Injectable()
export class OtpService {
  constructor(@InjectRepository(Otp) private otpRepository: Repository<Otp>) {}

  async create(): Promise<string> {
    const otpNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await hashPassword(otpNumber);
    return otpNumber;
  }
}
