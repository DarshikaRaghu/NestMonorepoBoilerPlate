import { Injectable } from '@nestjs/common';
import { Organization } from '../../../../infrastructure/entities/organization.entity';
import { OrganizationsRepository } from '../../../../infrastructure/repositories/organizations.repository';

@Injectable()
export class OrganizationsService {
   constructor(private readonly organRepository: OrganizationsRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

   async findAll(): Promise<Organization[]> {
      console.log('OrganizationsService#findAll');
      return this.organRepository.findAll();
    }
  
    async findOne(id: number): Promise<Organization | null> {
      console.log('OrganizationsService#findOne',id);
      return this.organRepository.findOne(id);
    }
  
    async create(Organization: Organization): Promise<Organization> {
      return this.organRepository.create(Organization);
    }
  
    async update(id: number, Organization: Organization): Promise<Organization | null> {
      return this.organRepository.update(id, Organization);
    }
  
    async remove(id: number): Promise<void> {
      await this.organRepository.remove(id);
    }

}
