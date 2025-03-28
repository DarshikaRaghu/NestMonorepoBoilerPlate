export const RABBITMQ_EXCHANGES = {
    USER_EXCHANGE: 'user-exchange',
    ORGANIZATION_EXCHANGE: 'organization-exchange'
  };
  
  export const RABBITMQ_QUEUES = {
    USER_CREATED: 'user-created',
    USER_ASSIGNED_TO_ORGANIZATION: 'user-assigned-to-organization',
    ORGANIZATION_CREATED: 'organization-created',
    ORGANIZATION_REQUEST: 'organization-request',
    ORGANIZATION_RESPONSE: 'organization-response'
  };
  
  export const RABBITMQ_ROUTING_KEYS = {
    USER_CREATED: 'user.created',
    USER_ASSIGNED: 'user.assigned',
    ORGANIZATION_CREATED: 'organization.created',
    ORGANIZATION_REQUEST: 'organization.request',
    ORGANIZATION_RESPONSE: 'organization.response'
  };