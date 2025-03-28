import { Module } from '@nestjs/common';
import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationsService } from './services/organizations.service';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './repositories/organizations.repository';
import { OrganizationEventsController } from './controllers/organizations.event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [AppModule,TypeOrmModule.forFeature([Organization]),
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
      ]),
],
  controllers: [OrganizationsController,OrganizationEventsController],
  providers: [OrganizationsService,OrganizationsRepository],
})
export class OrganizationsModule {}
