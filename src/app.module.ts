import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { Users } from './user/entity/user.entity';
import { Otp } from './otp/entity/otp.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '29011999',
      database: 'postgres',
      entities: [Users,Otp],
      synchronize: true,
    }),
    // UsersModule,
    UserModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'safiullah.eb19102107@gmail.com',
          pass: 'dlgdfeihgiufmahz',
        },
      },
    }),
    MailModule,
    OtpModule,
  ],
})
export class AppModule {}
