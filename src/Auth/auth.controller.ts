import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/users/user.dto';
import {LoginUserDto} from 'src/Auth/LoginUserDto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('AUTH')
@Controller("auth")
export class AuthsController {
  constructor(private readonly authsService01: AuthService) {}

  @Post("signin")
  // singIn(@Body() credentials:LoginUserDto){
  singIn(@Body() credentials:LoginUserDto){
    // const {email,password} = credentials;
    return this.authsService01.singIn(credentials);
  } 

  @Post("signup")
  singUp(@Body() user: SignupDto){
    return this.authsService01.signUp(user);
  }
}
