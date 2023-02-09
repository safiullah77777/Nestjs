import { MailerService } from '@nestjs-modules/mailer';
import {
  forwardRef,
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/bcrypt';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Otp } from './entity/otp.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private otpRepository: Repository<Otp>,
    // @Inject(forwardRef(() => UserService))
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private mailerService: MailerService, // private otpService: OtpService,
  ) {}

  async create(email: string): Promise<Otp> {
    const otpNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHashed = await hashPassword(otpNumber);
    const otp = await this.otpRepository.save({ otp: otpHashed });
    this.mailerService.sendMail({
      from: 'safiullah.eb19102107@gmil.com',
      to: email,
      text: `your otp verfication code is:${otpNumber}`,
    });
    return otp;
  }
  async find(id: string) {
    return await this.otpRepository.findOne({ where: { id } });
  }
  async verify(email: string, otpText: string): Promise<any> {
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
    const otp = await this.find(user.otpId);
    if (otp || otp.used)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'otp already used',
        },
        HttpStatus.FORBIDDEN,
      );
    const isMatch = await bcrypt.compare(otpText, otp.otp)
  }
}
