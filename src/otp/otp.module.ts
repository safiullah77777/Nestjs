import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Otp } from './entity/otp.entity';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]),forwardRef(() => UserModule)],
  controllers: [OtpController],
  providers: [OtpService],
  exports:[OtpService]
})
export class OtpModule {}
