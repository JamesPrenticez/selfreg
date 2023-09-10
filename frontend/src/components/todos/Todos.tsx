import React, { useState, type ReactElement, useEffect } from 'react'
import { 
  // type IWeekDetails, 
  type ITodo 
} from '../../models';
import { mockTodos } from '../../mocks'
// import { getWeekDetails } from '../../utils/getWeekDetails';

function Todos(): ReactElement {
  // Initialize state with mock data
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  // const [weekDetails, setWeekDetails] = useState<IWeekDetails | null>(null)

  // Simulate an API call
  useEffect(() => {
    // Fetch todos from API and set state
    // For demonstration, using a timeout to simulate network delay
    setTimeout(() => {
      setTodos(mockTodos);  // Replace mockTodos with actual data from API
    }, 2000);
  }, []);

  // useEffect(() => {
  //   if (!todos || todos.length === 0 || !todos[0].days || todos[0].days.length === 0) return;
  //   setWeekDetails(getWeekDetails(todos[0].days[0].date));
  // }, [todos]);

  // Update the status of a recurring task
  const updateTaskStatus = (id: string, date: string) => {

    // Check if todos is null
    if (todos === null) {
      // Handle the null case (e.g., return, throw an error, etc.)
      return;
    }

    // Clone the todos to avoid mutating state directly
    const updatedTodos = [...todos];

    // Find the todo and recurring task to update
    const todoToUpdate = updatedTodos.find(todo => todo._id === id);
    if (todoToUpdate) {
      const taskToUpdate = todoToUpdate.days.find(day => day.date === date);
      if (taskToUpdate) {
        // Update the status based on the current value
        taskToUpdate.status = taskToUpdate.status === null 
            ? true 
          : taskToUpdate.status === true 
            ? false 
          : taskToUpdate.status === false
            ? true
          : null;

        // Update the state
        setTodos(updatedTodos);

        // TODO: Make an API POST request to update the recurring task status
      }
    }
  };

  const daysOfTheWeek = ["M", "T", "W", "T", "F", "S", "S"]

  return (
    <div className="w-full flex flex-col gap-y-2">

      <div className="grid grid-cols-todos gap-x-2 w-full h-[32px] items-center">
        <h1 className='font-bold'>Week: 32</h1>
        {daysOfTheWeek.map((day, index) => (
          <DayLabelBox 
            key={`${day}-${index}`}
            value={day}/>
        ))}
      </div>

      {todos?.map((todo) => (
        <div key={todo._id} className="grid grid-cols-todos gap-x-2 w-full h-[32px] items-center">
          <h1 className="font-semibold flex overflow-hidden">
            {todo.task_name}
            {/* <small>{todo.description}</small> */}
          </h1>

          {todo.days.map((day) => (
            <TickBox 
              key={`${todo._id}-${day.date}`}
              value={day.status}
              onClick={() => updateTaskStatus(todo._id, day.date)}
            />
          ))}

        </div>
      ))}

    </div>
  )
}

export default Todos

interface TickBoxProps {
  value: boolean | null;
  onClick: () => void;
}

function TickBox({value, onClick}: TickBoxProps): ReactElement {
  const displayValue = value === null ? '-' : value === true ? 'x' : 'o';

  return (
    <div 
      onClick={onClick}
      className="
        flex
        items-center
        justify-center
        border-2
        border-gray-300
        rounded-md
        h-[32px]
        w-[32px]
        cursor-pointer
      "
    >
      {displayValue}
    </div>
  )
}

function DayLabelBox({value}: {value: string}): ReactElement {
  return (
    <div 
      className="
        flex
        items-center
        justify-center
        border-2
        border-gray-300
        rounded-md
        h-[32px]
        w-[32px]
        cursor-pointer
      "
    >
      {value}
    </div>
  )
}