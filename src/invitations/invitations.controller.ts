import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Invitation } from './invitations.entity';
import { InvitationsService } from './invitations.service';

@Controller('invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @Post()
  async createInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<Invitation> {
    return this.invitationsService.createInvitation(createInvitationDto);
  }

  @Get()
  async getInvitations(): Promise<Invitation[]> {
    return this.invitationsService.getInvitations();
  }
}
