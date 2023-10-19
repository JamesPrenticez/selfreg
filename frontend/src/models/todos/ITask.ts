import type { ReactNode } from 'react'

export interface ITask {
  _id: string;
  userId: string;
  task_name: string;
  slug: string;
  color: string;
  bgcolor: string;
  icon: ReactNode | undefined;
  successIcon: string;
  errorIcon: string;
}