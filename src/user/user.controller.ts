import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { GetUserDto } from './dtos/getUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
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
    return this.userService.get(req?.user)
  }
  
  @Get('/:id')
  getUser(@Param() params: GetUserDto) {
    return this.userService.get(params);
  }

  @Delete('/:id')
  deleteUser(@Param() id: string) {
    return this.userService.delete(id);
  }

  // @Req() req:Request , @Param() params:{id:string} 
  @Put('/:id')
  updateUser(@Param('id') id:string,@Body() updateUserDto:UpdateUserDto) {
    return this.userService.update(id,updateUserDto);
  }
 


}
