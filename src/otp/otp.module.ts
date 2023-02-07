import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { MongooseModule } from '@nestjs/mongoose';
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entity/otp.entity';
>>>>>>> be6fc27d0ff586e4bc74dca449bdfaeaefca338c
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { Otp, OtpSchema } from './schema/otp.schema';

@Module({
<<<<<<< HEAD
  imports: [MongooseModule.forFeature([{name:Otp.name,schema: OtpSchema }])],
=======
  imports: [TypeOrmModule.forFeature([Otp])],
>>>>>>> be6fc27d0ff586e4bc74dca449bdfaeaefca338c
  controllers: [OtpController],
  providers: [OtpService],
  exports:[OtpService]
})
export class OtpModule {}
