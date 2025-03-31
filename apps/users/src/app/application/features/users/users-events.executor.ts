import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { GET_USER_EVENT, UPDATE_USER_EVENT } from '../../constants';
import { IUserRepo } from './repositories/i-users-repo';
import { User } from "apps/users/src/app/infrastructure/entities/user.entity";

@Controller()
export class UsersEventsExecutor {
  constructor(@Inject("IUsersRepo") private readonly userRepo:IUserRepo) {}

  @MessagePattern(GET_USER_EVENT)
  async handleGetUser(data: {  id: number }) {
    return this.userRepo.findOne(data.id);
  }

  @EventPattern(UPDATE_USER_EVENT)
  async handleUpdateUser(data: {  id: number },user:{User:User}) {
    return this.userRepo.update(data.id,user.User);
  }

} 