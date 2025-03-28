import { Injectable } from '@nestjs/common';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService {
   constructor(private readonly organizationRepository: OrganizationsRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

   async findAll(): Promise<Organization[]> {
      console.log('OrganizationsService#findAll');
      return this.organizationRepository.findAll();
    }
  
    async findOne(id: number): Promise<Organization | null> {
      console.log('OrganizationsService#findOne',id);
      return this.organizationRepository.findOne(id);
    }
  
    async create(Organization: Organization): Promise<Organization> {
      return this.organizationRepository.create(Organization);
    }
  
    async update(id: number, Organization: Organization): Promise<Organization | null> {
      return this.organizationRepository.update(id, Organization);
    }
  
    async remove(id: number): Promise<void> {
      await this.organizationRepository.remove(id);
    }

}
