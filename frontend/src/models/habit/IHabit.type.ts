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
  days?: IDays;
  frequency?: string;
}

export type IDays = Record<string, IDay>;;

export interface IDay {
  _id: string;
  habit_id: string;
  date: Date;
   
  status?: boolean | null;

  measurement?: {
    quantity: number;
    unit: Unit;
  }
}

export enum Unit {
  TIME="time",
  COUNT="count"
}
