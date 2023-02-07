import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';


export type OtpDocument = HydratedDocument<Otp>;
@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true })
  otp: string;

  @Prop({ default: false })
  used: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
//Hash Password Before Saving In Database
OtpSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt();
  this.otp = await bcrypt.hash(this.otp, salt);
});
