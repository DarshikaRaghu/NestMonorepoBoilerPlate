import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './services/organizations.service';
import { Organization } from '../../../infrastructure/entities/organization.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { GET_USER_EVENT } from '../constanst';
import { IOrganizationRepo } from './repositories/i-organizations-repo';
import { JwtAuthGuard } from '@app/common';

@ApiTags('organizations')
@ApiBearerAuth('JWT-auth')
@Controller('organization')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject("IOrganizationsRepo") private readonly organizationRepo: IOrganizationRepo
  ) {}

  @Get()
  getHello(): string {
    return this.organizationsService.getHello();
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'Return all organizations' })
  async findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number): Promise<Organization | null> {
  //   return this.organizationsService.findOne(id);
  // }

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({ status: 201, description: 'Organization has been successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() organization: Organization): Promise<Organization> {
    return this.organizationsService.create(organization);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @ApiResponse({ status: 200, description: 'Organization has been successfully updated' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() organization: Organization): Promise<Organization | null> {
    return this.organizationsService.update(id, organization);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @ApiResponse({ status: 200, description: 'Organization has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.organizationsService.remove(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiParam({ name: 'id', description: 'Organization ID' })
  @ApiResponse({ status: 200, description: 'Return the organization' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async getOrganization(@Param('id') id: number): Promise<Organization|null> {
    return this.organizationsService.findOne(id);
  }

  @Get(':id/users/:userId')
  @ApiOperation({ summary: 'Get organization with users details' })
  @ApiParam({ name: 'id', description: 'organization ID' })
  @ApiParam({ name: 'userId', description: 'users ID' })
  @ApiResponse({ status: 200, description: 'Return user with organization details' })
  @ApiResponse({ status: 404, description: 'User or organization not found' })
  async getUserOrganization(@Param('id') orgId: number, @Param('userId') userId: number) {
    const organization = await this.organizationRepo.findOne(orgId);    
    const user = await this.usersClient.send(GET_USER_EVENT, { id: userId }).toPromise();
    return {
      user,
      organization,
    };
  }
}
