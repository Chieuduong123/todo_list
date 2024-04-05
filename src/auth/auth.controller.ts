import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<any> {
    return await this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body(ValidationPipe) LoginDto: LoginDto): Promise<any> {
    return await this.authService.login(LoginDto);
  }
}
