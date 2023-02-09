import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OtpModule } from 'src/otp/otp.module';
import { Users } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  // imports: [MongooseModule.forFeature([{name:User.name,schema: UserSchema }])],

  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => OtpModule),forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
