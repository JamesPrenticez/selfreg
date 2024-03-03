import { ITodo, IDay } from "@models";

import { mockUsers, mockTodos, mockDays } from "@mocks";

const mockSQL = {
  WHERE_ONE(data: any[], key: string, value: string){
    const filteredData = data.find((x) =>
      x[key].toLowerCase() === value.toLowerCase()
    );
    return [200, filteredData];
  },
  WHERE_MANY(data: any[], key: string, value: string){
    const filteredData = data.filter((x) =>
      x[key].toLowerCase() === value.toLowerCase()
    );
    return [200, filteredData];
  },
  JOIN_TODO_AND_DAYS(
    user_id: string,
    start_date: string,
    end_date: string,
    mockTodos: ITodo[],
    mockDays: IDay[],
  ): [number, ITodo[]] {
    // Filter Todos by user_id
    const filteredTodos = mockTodos.filter((todo) => todo.user_id === user_id);
  
    // Filter Days by date range and _todo_id from the filtered Todos
    const filteredDays = mockDays.filter(
      (day) =>
        day.date >= start_date &&
        day.date <= end_date &&
        filteredTodos.some((todo) => todo._id === day.todo_id)
    );
  
    // Join the filtered Days with the filtered Todos based on _todo_id
    const joinedData: ITodo[] = filteredTodos.map((todo) => ({
      ...todo,
      days: filteredDays
        .filter((day) => day.todo_id === todo._id)
        .map((day) => ({
          _id: day._id,
          todo_id: day.todo_id,
          date: day.date,
          status: day.status,
        })),
    }));
  
    return [200, joinedData];
  },
  GET_DAYS_FOR_TODO_ID_LIST_BETWEEN_DATE_RANGE(
    user_id: string,
    todo_ids: string[],
    start_date: string,
    end_date: string,
  ): [number, IDay[]] {
    const filteredTodos = mockTodos.filter((todo) => todo.user_id === user_id);
  
    const filteredDays = mockDays.filter(
      (day) =>
        day.date >= start_date &&
        day.date <= end_date &&
        todo_ids.includes(day.todo_id) && // Check if day's todo_id is in the todo_ids list
        filteredTodos.some((todo) => todo._id === day.todo_id)
    );
  
    return [200, filteredDays];
  }
}

export default mockSQL