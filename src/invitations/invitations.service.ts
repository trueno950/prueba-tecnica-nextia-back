import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Invitation } from './invitations.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from '../users/users.repository';
import { throwException } from '../common/thrwoException.helper';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationsRepository: Repository<Invitation>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createInvitation(
    createInvitationDto: CreateInvitationDto,
  ): Promise<Invitation> {
    const user = await this.usersRepository.findById(createInvitationDto.userId)

    if(!user){
      throwException(
        HttpStatus.NOT_FOUND,
        'User not found',
      );
    }
    const invitation = new Invitation();
    invitation.guestName = createInvitationDto.guestName;
    invitation.entryDate = createInvitationDto.entryDate;
    invitation.expirationDate = createInvitationDto.expirationDate;
    invitation.user = user;
    return this.invitationsRepository.save(invitation);
  }

  async getInvitations(): Promise<Invitation[]> {
    return this.invitationsRepository.find();
  }
}
