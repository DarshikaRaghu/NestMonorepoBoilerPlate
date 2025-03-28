import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';
import { OrganizationEventsController } from './organizations.event.controller';

@Module({
  imports: [AppModule,TypeOrmModule.forFeature([Organization])
],
  controllers: [OrganizationsController,OrganizationEventsController],
  providers: [OrganizationsService,OrganizationsRepository],
})
export class OrganizationsModule {}
