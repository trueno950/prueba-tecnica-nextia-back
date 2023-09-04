import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length, IsPositive } from 'class-validator';
import { LoginDto } from './login.dto';
import { Role } from '../../users/enums/role.enum';

export class RegisterDto extends PartialType(LoginDto) {
  @IsNotEmpty()
  @Length(3, 50)
  firstName: string;

  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;

  @IsNotEmpty()
  @IsPositive()
  apartmentNumber: number;

  @IsNotEmpty()
  @Length(3, 50)
  role: Role;
}
