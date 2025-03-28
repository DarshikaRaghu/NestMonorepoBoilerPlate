import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UsersService } from '../services/users.service';
import { GET_USER_EVENT } from '../constants/constants';

@Controller()
export class UsersEventsController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(GET_USER_EVENT)
  async handleGetUser(data: {  id: number }) {
    return this.usersService.findOne(data.id);
  }

} 