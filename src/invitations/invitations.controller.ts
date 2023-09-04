import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Invitation } from './invitations.entity';
import { InvitationsService } from './invitations.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@ApiTags('invitations')
@Controller()
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @Post('invitations')
  async createInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<Invitation> {
    return this.invitationsService.createInvitation(createInvitationDto);
  }

  @Get('users/:userId/invitations')
  async getInvitations(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('sort') sort: string = 'createdAt',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    @Query('filter') filter: string = '',
  ): Promise<{}> {
    return this.invitationsService.getInvitations(
      userId,
      page,
      perPage,
      sort,
      order,
      filter,
    );
  }

  @Get('invitations/:invitationId')
  async getInvitationDetail(
    @Param('invitationId') invitationId: number,
  ): Promise<Invitation> {
    return this.invitationsService.getInvitationDetail(invitationId);
  }

  @Put('invitations/:invitationId')
  async updateInvitation(
    @Param('invitationId') invitationId: number,
    @Body() updateInvitationDto: UpdateInvitationDto,
  ): Promise<Object> {
    return this.invitationsService.updateInvitation(invitationId,updateInvitationDto);
  }

  @Delete('invitations/:invitationId')
  async deleteInvitation(
    @Param('invitationId') invitationId: number,
  ): Promise<Object> {
    return this.invitationsService.deleteInvitation(invitationId);
  }
}
