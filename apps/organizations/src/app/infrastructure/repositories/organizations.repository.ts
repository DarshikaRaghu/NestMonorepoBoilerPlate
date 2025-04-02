import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { ORGANIZATIONS_REPO, IOrganizationRepo } from '../../application/features/organizations/repositories/i-organizations-repo';

@Injectable()
export class OrganizationsRepository implements IOrganizationRepo {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Organization|null> {
    return this.organizationRepository.findOne({ where: { id } });
  }

  async create(organization: Organization): Promise<Organization> {
    return this.organizationRepository.save(organization);
  }

  async update(id: number, organization: Organization): Promise<Organization | null> {
    await this.organizationRepository.update(id, organization);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.organizationRepository.delete(id);
  }
}