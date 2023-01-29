import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { GetUserDto } from './dtos/getUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }


  @Get('/all')
  getUsers() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getPersonalDetail(@Req() req:Request) {
    console.log({...req?.user})
    return this.userService.getById(req?.user)
  }
  
  @Get('/:_id')
  getUser(@Param() params: GetUserDto) {
    console.log(params)
    return this.userService.get(params);
  }

  @Delete('/:_id')
  deleteUser(@Param() _id: GetUserDto) {
    return this.userService.delete(_id);
  }

  @Put('/:id')
  updateUser(@Req() req:Request , @Param() params:{id:string} ) {
    console.log(params)
    return this.userService.update(req,params.id);
  }
 


}
