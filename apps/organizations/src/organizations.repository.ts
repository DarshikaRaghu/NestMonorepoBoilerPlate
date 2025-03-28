import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';


@Injectable()
export class OrganizationsRepository {
  constructor(
    @InjectRepository(Organization)
    private OrganizationRepository: Repository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return this.OrganizationRepository.find();
  }

  async findOne(id: number): Promise<Organization|null> {
    return this.OrganizationRepository.findOne({ where: { id } });
  }

  async create(Organization: Organization): Promise<Organization> {
    return this.OrganizationRepository.save(Organization);
  }

  async update(id: number, Organization: Organization): Promise<Organization | null> {
    await this.OrganizationRepository.update(id, Organization);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.OrganizationRepository.delete(id);
  }
}