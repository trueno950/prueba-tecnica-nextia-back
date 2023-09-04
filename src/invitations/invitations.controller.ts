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
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Invitation } from './invitations.entity';
import { InvitationsService } from './invitations.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/roles.decorador';

@ApiTags('invitations')
@Controller()
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @UseGuards(JwtAuthGuard)
  @Role('user')
  @Post('invitations')
  async createInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
    @Res() res,
  ): Promise<void> {
    const invitation =
      await this.invitationsService.createInvitation(createInvitationDto);
    res.status(HttpStatus.CREATED).json({
      message: 'Invitation created',
      data: invitation,
      code: HttpStatus.CREATED,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Role('user')
  @Get('users/:userId/invitations')
  async getInvitations(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('sort') sort: string = 'createdAt',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    @Query('filter') filter: string = '',
    @Res() res,
  ): Promise<void> {
    const invitations = await this.invitationsService.getInvitations(
      userId,
      page,
      perPage,
      sort,
      order,
      filter,
    );

    res.status(HttpStatus.PARTIAL_CONTENT).json({
      message: 'List invitations',
      data: invitations,
      code: HttpStatus.PARTIAL_CONTENT,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Role('user')
  @Get('invitations/:invitationId')
  async getInvitationDetail(
    @Param('invitationId') invitationId: number,
    @Res() res,
  ): Promise<void> {
    const detail =
      await this.invitationsService.getInvitationDetail(invitationId);

    res.status(HttpStatus.OK).json({
      message: 'Invitation details',
      data: detail,
      code: HttpStatus.OK,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Role('user')
  @Put('invitations/:invitationId')
  async updateInvitation(
    @Param('invitationId') invitationId: number,
    @Body() updateInvitationDto: UpdateInvitationDto,
    @Res() res,
  ): Promise<void> {
    await this.invitationsService.updateInvitation(
      invitationId,
      updateInvitationDto,
    );

    res
      .status(HttpStatus.OK)
      .json({ message: 'Invitation updated', code: HttpStatus.OK });
  }

  @UseGuards(JwtAuthGuard)
  @Role('user')
  @Delete('invitations/:invitationId')
  async deleteInvitation(
    @Param('invitationId') invitationId: number,
    @Res() res,
  ): Promise<void> {
    await this.invitationsService.deleteInvitation(invitationId);

    res
      .status(HttpStatus.OK)
      .json({ message: 'Invitation deleted', code: HttpStatus.OK });
  }
}