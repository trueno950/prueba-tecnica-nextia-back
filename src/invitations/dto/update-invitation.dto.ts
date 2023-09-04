import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class UpdateInvitationDto {
  @IsNotEmpty()
  guestName: string;

  @IsNotEmpty()
  @IsDateString()
  entryDate: Date;

  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;
}
