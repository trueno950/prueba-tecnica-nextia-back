import { IsEmail, IsNotEmpty, Length, Matches, isNotEmpty } from "class-validator";

export class ForgotPassword {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {  
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, {
    message: 'The password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
  })
  newPassword: string;}
