import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dtos/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}



  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // Passport automatically creates a user object, based on the value we return from the validate() method, and assigns it to the Request object as req.user
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signin')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(
      body.username,
      body.email,
      body.password,
    );
  }
}
