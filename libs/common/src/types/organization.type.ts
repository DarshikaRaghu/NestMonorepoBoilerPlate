export interface OrganizationCreatedEvent {
    id: string;
    name: string;
    email: string;
}


export interface OrganizationRequestEvent {
    requestId: string;
    organizationId: string;
}
  
export interface OrganizationResponseEvent {
    requestId: string;
    organization?: OrganizationCreatedEvent;
    error?: string;
}