import { Module } from '@nestjs/common';
import { TrophyController } from './trophy.controller';
import { TrophyService } from './trophy.service';

@Module({
  imports: [],
  controllers: [TrophyController],
  providers: [TrophyService],
})
export class TrophyModule {}
