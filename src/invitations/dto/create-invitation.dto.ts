import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  guestName: string;

  @IsNotEmpty()
  @IsDateString()
  entryDate: Date;

  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
