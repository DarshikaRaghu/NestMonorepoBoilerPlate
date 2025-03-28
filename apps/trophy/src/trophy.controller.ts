import { Controller, Get } from '@nestjs/common';
import { TrophyService } from './trophy.service';

@Controller()
export class TrophyController {
  constructor(private readonly trophyService: TrophyService) {}

  @Get()
  getHello(): string {
    return this.trophyService.getHello();
  }
}
