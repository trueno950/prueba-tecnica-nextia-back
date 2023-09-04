import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Invitation } from './invitations.entity';
import { ILike, Like, Repository } from 'typeorm';
import { UsersRepository } from '../users/users.repository';
import { throwException } from '../common/thrwoException.helper';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

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
    const user = await this.usersRepository.findById(
      createInvitationDto.userId,
    );

    if (!user) {
      throwException(HttpStatus.NOT_FOUND, 'User not found');
    }
    const invitation = new Invitation();
    invitation.guestName = createInvitationDto.guestName;
    invitation.entryDate = createInvitationDto.entryDate;
    invitation.expirationDate = createInvitationDto.expirationDate;
    invitation.user = user;
    return this.invitationsRepository.save(invitation);
  }

  async getInvitations(
    userId: number,
    page: number,
    perPage: number,
    sort: string,
    order: 'ASC' | 'DESC',
    filter: string,
  ): Promise<{
    invitations: Invitation[];
    totalItems: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * perPage;
    const where = {
      user: {
        id: userId,
      },
    };

    if (filter) {
      where['guestName'] = ILike(`%${filter}%`);
    }

    const [invitations, totalItems] =
      await this.invitationsRepository.findAndCount({
        where,
        order: {
          [sort]: order,
        },
        skip,
        take: perPage,
      });

    const totalPages = Math.ceil(totalItems / perPage);

    return { invitations, totalItems, totalPages };
  }

  async getInvitationDetail(invitationId: number): Promise<Invitation> {
    const detailInvitation = await this.invitationsRepository.findOneBy({
      id: invitationId,
    });

    if (!detailInvitation) {
      throwException(HttpStatus.NOT_FOUND, 'Invitation not found');
    }
    return detailInvitation;
  }

  async updateInvitation(
    invitationId: number,
    updateInvitationDto: UpdateInvitationDto,
  ): Promise<Object> {
    const existInvitation = await this.invitationsRepository.findOne({
      where: {
        id: invitationId,
      },
    });

    if (!existInvitation) {
      throwException(HttpStatus.NOT_FOUND, 'Invitation not found');
    }
    const invitation = new Invitation();
    invitation.guestName = updateInvitationDto.guestName;
    invitation.entryDate = updateInvitationDto.entryDate;
    invitation.expirationDate = updateInvitationDto.expirationDate;

    return this.invitationsRepository.update(invitationId, invitation);
  }

  async deleteInvitation(invitationId: number): Promise<Object> {
    const existInvitation = await this.invitationsRepository.findOne({
      where: {
        id: invitationId,
      },
    });

    if (!existInvitation) {
      throwException(HttpStatus.NOT_FOUND, 'Invitation not found');
    }

    return this.invitationsRepository.delete(invitationId);
  }
}
