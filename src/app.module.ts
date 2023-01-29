import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    // UsersModule,
    UserModule,
    AuthModule,
    MailerModule
  ],
})
export class AppModule {}
