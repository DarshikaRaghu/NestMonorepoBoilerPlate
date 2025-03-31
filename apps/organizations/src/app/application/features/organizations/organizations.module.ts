import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './services/organizations.service';
import { AppModule } from '../../../infrastructure/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../../../infrastructure/entities/organization.entity';
import { OrganizationsRepository } from '../../../infrastructure/repositories/organizations.repository';
import { OrganizationEventsExecutor } from './organizations.event.executor';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORGANIZATIONS_REPO } from './repositories/i-organizations-repo';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    AppModule,
    CommonModule,
    TypeOrmModule.forFeature([Organization]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OrganizationsController, OrganizationEventsExecutor
  ],
  providers: [OrganizationsService, OrganizationsRepository,
    {
      provide:ORGANIZATIONS_REPO,
      useClass:OrganizationsRepository
    }
  ],
})
export class OrganizationsModule {}
