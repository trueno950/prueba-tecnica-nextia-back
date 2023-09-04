import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id: id } });
  }
}
