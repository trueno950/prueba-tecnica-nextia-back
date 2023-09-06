import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/roles.decorador';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Role('user')
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Role('user')
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.usersService.getUserById(id);
  }
}
