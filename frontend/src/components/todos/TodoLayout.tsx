import React from 'react'
import type { ITodo, ITask } from '@models';
import dayjs from 'dayjs';
import EmojiWrapper from '@components/emoji/EmojiWrapper';

interface Props {
  task: ITask;
  todo: ITodo;
}


function TodoLayout({
  task,
  todo,
}: Props) {

  return (
    <div className='grid grid-cols-7 h-full items-center justify-center w-full gap-x-2'>
      {todo.days.map((day, index) => {
        const displayValue = day.status === null ? '-' : day.status === true ? 'x' : 'o';

        const renderTodoStatus = () => {
          if (day.status === null) {
            // const dayOfWeek = dayjs(day.date).day() // returns number
            const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
            const dayLabel = dayLabels[index]; 
            return <span style={{ fontSize: 50, color: task.bgcolor, fontWeight: 500}}>{dayLabel}</span>
          } 
          else if(day.status === true) {
            return task.successIcon !== "" ? <EmojiWrapper unified={task.successIcon} size={50} /> : null
          }
          else if (day.status === false) {
            return task.errorIcon !== "" ? <EmojiWrapper unified={task.errorIcon} size={50} /> : null
          } 
        }

        return (
          <div 
            key={day.date}
            className='bg-white/40 hover:bg-white/80 rounded-lg w-full aspect-square flex items-center justify-center '
          >
            {renderTodoStatus()}
          </div>
        )}
      )}
    </div>
  )
}

export default TodoLayout