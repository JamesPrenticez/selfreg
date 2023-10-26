import { ITodo, IUser, IWeek } from "@models";

interface InitialState {
  user: IUser | undefined;
  todos: ITodo[] | undefined;
  week: IWeek | undefined;
}

const initialState: InitialState = {
  user: undefined,
  todos: undefined,
  week: undefined
};

export default initialState;