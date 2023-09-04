import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guestName: string;

  @Column()
  entryDate: Date;

  @Column()
  expirationDate: Date;

  @ManyToOne(()=> User, (user) => user.invitations)
  user: User;
}
