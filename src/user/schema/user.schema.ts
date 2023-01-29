import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    index:true
  })
  email: string;

  @Prop({select:false})
  password: string;

  @Prop({ default: false })
  isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
//Hash Password Before Saving In Database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

//Compare Password
UserSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};
