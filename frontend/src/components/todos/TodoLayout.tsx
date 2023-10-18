import React from 'react'
import { mockTodos } from '@mocks'
import type { ITodo } from '@models';
import dayjs from 'dayjs';

interface Props {
  todo: ITodo;
}


function TodoLayout({ todo }: Props) {

  return (
    <div className='grid grid-cols-7 h-full items-center justify-between'>
      {todo.days.map((day, index) => {
        const displayValue = day.status === null ? '-' : day.status === true ? 'x' : 'o';

        const renderTodoStatus = () => {
          if(day.status === null) {
            // const dayOfWeek = dayjs(day.date).day() // returns number
            const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
            const dayLabel = dayLabels[index]; 
            return <div>{dayLabel}</div>
          }
        }

        return (
          <div className=' even:bg-gray-300 odd:bg-gray-400 w-6 h-6 flex items-center justify-center'>
            {renderTodoStatus()}
          </div>
        )}
      )}
    </div>
  )
}

export default TodoLayout