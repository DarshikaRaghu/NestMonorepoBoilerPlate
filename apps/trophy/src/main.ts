import { NestFactory } from '@nestjs/core';
import { TrophyModule } from './trophy.module';

async function bootstrap() {
  const app = await NestFactory.create(TrophyModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
