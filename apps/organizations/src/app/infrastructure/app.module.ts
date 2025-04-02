// apps/auth/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrganizationsModule } from '../application/features/organizations/organizations.module';
import { join } from 'path';
import { Organization } from './entities/organization.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/organizations/src/.env', // Use the local .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Organization],
        migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
        migrationsTableName: 'migrations',
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        autoLoadEntities: true,
        logging: true,
      }),
    }),
   OrganizationsModule,
  ],
  // ...
})
export class AppModule {}

