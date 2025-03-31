import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrganizationsService } from './services/organizations.service';
import { GET_ORGANIZATION_EVENT } from '../constanst';


@Controller()
export class OrganizationEventsExecutor {
  constructor(private readonly organizationService: OrganizationsService) {}

  @EventPattern(GET_ORGANIZATION_EVENT)
  async handleGetOrganization(data: { id: number }) {
    return this.organizationService.findOne(data.id);
  }
} 