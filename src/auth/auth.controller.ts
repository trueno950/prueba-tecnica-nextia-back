import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPassword, ResetPasswordDto } from './dto/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res): Promise<void> {
    const accessToken = await this.authService.login(loginDto);
    res.status(HttpStatus.OK).json({ ...accessToken, code: HttpStatus.OK });
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res): Promise<void> {
    const user = await this.authService.register(registerDto);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'User created', user, code: HttpStatus.CREATED });
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPassword,
    @Res() res,
  ): Promise<void> {
    await this.authService.sendPasswordResetToken(forgotPasswordDto);
    res.status(HttpStatus.OK).json({ message: 'Password reset token sent' });
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordDto);
    res.status(HttpStatus.OK).json({ message: 'Password reset successful' });
  }
}
