import type { ReactNode } from 'react'

export interface IValidTasks {
  _id: string;
  task_name: string;
  slug: string;
  color: string;
  bgcolor: string;
  icon: ReactNode | undefined;
}