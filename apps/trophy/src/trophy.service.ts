import { Injectable } from '@nestjs/common';

@Injectable()
export class TrophyService {
  getHello(): string {
    return 'Hello World!';
  }
}
