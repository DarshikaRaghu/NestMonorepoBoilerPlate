import { Organization } from "apps/organizations/src/app/infrastructure/entities/organization.entity";

export const ORGANIZATIONS_REPO = "IOrganizationsRepo";

export interface IOrganizationRepo{
 findAll(): Promise<Organization[]> ;
 findOne(id: number): Promise<Organization|null> ;
 create(Organization: Organization): Promise<Organization> ;
 update(id: number, Organization: Organization): Promise<Organization | null> ;
 remove(id: number): Promise<void> ;
}