export interface IHabit {
  _id: string;
  user_id: string;
  title: string;
  slug?: string;
  color?: string;
  bgcolor?: string;
  icon?: string;
  successIcon?: string;
  errorIcon?: string;
  description?: string;
  created_at?: string;
  days?: IDays[] | undefined;
  frequency?: string;
}

export interface IDays {
  _id: string;
  todo_id: string;
  date: string;
  status: boolean | null;
}
