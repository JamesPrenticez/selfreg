export interface IDays {
  date: string;
  status: boolean | null;
}

export interface ITodo {
  _id: string;
  user_id: string;
  task_name: string;
  description: string;
  created_at: string;
  days: IDays[];
}