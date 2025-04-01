import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonJwtModule } from './jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CommonJwtModule,ConfigModule.forRoot({  envFilePath: './libs/common/src/.env',isGlobal: true }), ],
  providers: [CommonService],
  exports: [CommonService, CommonJwtModule],
})
export class CommonModule {}
