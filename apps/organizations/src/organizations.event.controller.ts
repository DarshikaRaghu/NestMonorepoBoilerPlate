import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrganizationsService } from './organizations.service';


@Controller()
export class OrganizationEventsController {
  constructor(private readonly organizationService: OrganizationsService) {}

  @EventPattern('get_organization')
  async handleGetOrganization(data: { id: number }) {
    return this.organizationService.findOne(data.id);
  }
} 