import { Test, TestingModule } from '@nestjs/testing';
import { TrophyController } from './trophy.controller';
import { TrophyService } from './trophy.service';

describe('TrophyController', () => {
  let trophyController: TrophyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrophyController],
      providers: [TrophyService],
    }).compile();

    trophyController = app.get<TrophyController>(TrophyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(trophyController.getHello()).toBe('Hello World!');
    });
  });
});
