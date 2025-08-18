// src\interface\event-types.interface.ts
export interface EventPayloads {
  'init.start': {
    email: string;
    initStatus: InitStatus;
  };
}

type InitStatus = {
  progress: number;
  status: 'pending' | 'in_progress' | 'completed';
};
