import { Users } from "../entity/user.entity";
import { CreateUserDto } from "./createUser.dto";
import {PartialType} from '@nestjs/mapped-types'
export class UpdateUserDto extends PartialType(CreateUserDto){}