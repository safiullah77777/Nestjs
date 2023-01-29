import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { GetUserDto } from './dtos/getUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userServicer: UserService) {}

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userServicer.create(createUser);
  }


  @Get()
  getUsers() {
    return this.userServicer.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:_id')
  getUser(@Param() params: GetUserDto) {
    console.log(params)
    return this.userServicer.get(params);
  }

  @Delete('/:_id')
  deleteUser(@Param() _id: GetUserDto) {
    return this.userServicer.delete(_id);
  }

  @Put('/:id')
  updateUser(@Req() req:Request , @Param() params:{id:string} ) {
    console.log(params)
    return this.userServicer.update(req,params.id);
  }
 


}
