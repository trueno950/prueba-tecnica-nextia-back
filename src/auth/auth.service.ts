import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';
import { throwException } from '../common/thrwoException.helper';
import { ForgotPassword, ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from '../mail/email.service';
import { Mail } from '../mail/resources/interfaces/mail.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly _emailService: EmailService,
  ) {}

  async login(loginDto: LoginDto): Promise<object> {
    const user = await this.usersRepository.getUserByEmail(loginDto.email);

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload = { userId: user.id, role: user.role };
      return {
        user,
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = new User();
      registerDto.password = hashedPassword;
      Object.assign(user, registerDto);
      return await this.usersRepository.saveUser(user);
    } catch (error) {
      if (error.code === '23505') {
        throwException(HttpStatus.CONFLICT, 'Duplicate user');
      } else {
        throwException(HttpStatus.INTERNAL_SERVER_ERROR, 'Server error');
      }
    }
  }

  async sendPasswordResetToken(
    forgotPasswordDto: ForgotPassword,
  ): Promise<void> {
    const { email } = forgotPasswordDto;
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throwException(HttpStatus.NOT_FOUND, 'User not found');
    }

    const resetToken = await this.generateResetToken(email);
    const mail: Mail = {
      to: user.email,
      subject: 'Restaurar Contraseña',
      emailData: {
        firstName: user.firstName,
        url: `www.google.com`,
      },
      templateId: './confirmation.hbs',
    };
    await this._emailService.sendByTemplate(mail);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = resetPasswordDto;
    const email = await this.getEmail(token);
    if (!email) {
      throwException(HttpStatus.NOT_FOUND, 'Email not found');
    }
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throwException(HttpStatus.NOT_FOUND, 'User not found');
    }

    if (await this.isValidResetToken(token)) {
      throwException(
        HttpStatus.NOT_ACCEPTABLE,
        'User reset token is not valid',
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.usersRepository.saveUser(user);
  }

  async generateResetToken(email: string): Promise<string> {
    const payload = { email };

    const tokenOptions = {
      expiresIn: '1h',
    };

    const resetToken = this.jwtService.sign(payload, tokenOptions);
    return resetToken;
  }

  async isValidResetToken(encodedToken: string): Promise<boolean> {
    try {
      const payload = this.jwtService.verify(encodedToken);

      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp > currentTimestamp) {
        return false;
      }
      return true;
    } catch (error) {
      return true;
    }
  }

  async getEmail(encodedToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(encodedToken);
      if (payload.email) {
        return payload.email;
      }
      return '';
    } catch (error) {
      return '';
    }
  }
}
