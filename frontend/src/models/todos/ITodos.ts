export interface ITodo {
  _id: string | undefined;
  user_id: string | undefined;
  title: string | undefined;
  slug: string | undefined;
  color: string | undefined;
  bgcolor: string | undefined;
  icon: string | undefined;
  successIcon: string | undefined;
  errorIcon: string | undefined;
  description: string | undefined;
  created_at: string | undefined;
  days: IDay[] | undefined;
}

export interface IDay {
  _id: string | undefined;
  todo_id: string | undefined
  date: string;
  status: boolean | null;
}
