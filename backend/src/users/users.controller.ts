import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import * as usersService from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: usersService.UsersService) {}

  @Post()
  create(@Body() body: usersService.CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: usersService.CreateUserDto) {
    return this.usersService.update(Number(id), body);
  }
}
