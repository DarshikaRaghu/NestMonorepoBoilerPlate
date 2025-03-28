import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UsersService } from '../users.service';

@Controller('organization-events')
export class OrganizationEventsController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('organization_created')
  async handleOrganizationCreated(data: any) {
    console.log('Organization created event received:', data);
    // Handle organization created event
    // For example, you might want to notify users about the new organization
  }

  @EventPattern('organization_updated')
  async handleOrganizationUpdated(data: any) {
    console.log('Organization updated event received:', data);
    // Handle organization updated event
    // For example, you might want to update user references to the organization
  }

  @EventPattern('organization_deleted')
  async handleOrganizationDeleted(data: any) {
    console.log('Organization deleted event received:', data);
    // Handle organization deleted event
    // For example, you might want to remove organization references from users
  }
} 