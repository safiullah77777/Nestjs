import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { Otp, OtpSchema } from './schema/otp.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:Otp.name,schema: OtpSchema }])],
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule {}
