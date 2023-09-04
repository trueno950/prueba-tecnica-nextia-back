import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from './enums/role.enum';
import { Invitation } from '../invitations/invitations.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  apartmentNumber: number;
  
  @Column()
  role: Role

  @OneToMany(()=> Invitation, (invitation) => invitation.user)
  invitations: Invitation[];
}