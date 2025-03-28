// apps/users/src/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService,
    @Inject('ORGANIZATION_SERVICE') private readonly organizationClient: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Return the user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User has been successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User has been successfully updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<User | null> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }

  @Get(':id/organization/:orgId')
  @ApiOperation({ summary: 'Get user with organization details' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiParam({ name: 'orgId', description: 'Organization ID' })
  @ApiResponse({ status: 200, description: 'Return user with organization details' })
  @ApiResponse({ status: 404, description: 'User or organization not found' })
  async getUserOrganization(@Param('id') userId: number, @Param('orgId') orgId: string) {
    const user = await this.usersService.findOne(userId);    
    const organization = await this.organizationClient.send('get_organization', { id: orgId }).toPromise();
    
    return {
      user,
      organization,
    };
  }
}