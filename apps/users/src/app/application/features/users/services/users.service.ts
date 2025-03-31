// apps/users/src/users.service.ts
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../../infrastructure/repositories/users.repository';
import { User } from '../../../../infrastructure/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    console.log('UsersService#findAll');
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    console.log('UsersService#findOne',id);
    return this.usersRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findByUsername(username);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.create(user);
  }

  async update(id: number, user: User): Promise<User | null> {
    return this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.remove(id);
  }

}