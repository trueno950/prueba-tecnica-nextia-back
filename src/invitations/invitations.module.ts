import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitations.entity';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation, User])],
  controllers: [InvitationsController],
  providers: [UsersRepository, InvitationsService],
})
export class InvitationsModule {}
