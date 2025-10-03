// src\interface\event-types.interface.ts
export interface EventPayloads {
  'init.start': {
    email: string;
    initStatus: InitStatus;
  };
  'init.email': {
    tenant: {
      tenantSlug: string;
      tenantId: string;
    };
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    generatedPassword: string;
  };
}

type InitStatus = {
  progress: number;
  status: 'pending' | 'in_progress' | 'completed';
};
