import React from 'react'
import type { ITodo } from '@models';
import dayjs from 'dayjs';
import EmojiWrapper from '@components/emoji/EmojiWrapper';

interface Props {
  todo: ITodo;
}


function TodoLayout({
  todo,
}: Props) {

  return (
    <div className='grid grid-cols-7 h-full items-center justify-center w-full gap-x-2'>
      
      { todo.days ? (
        todo.days.map((day, index) => {
          const displayValue = day.status === null ? '-' : day.status === true ? 'x' : 'o';

          const renderTodoStatus = () => {
            if (day.status === null) {
              // const dayOfWeek = dayjs(day.date).day() // returns number
              const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
              const dayLabel = dayLabels[index]; 
              return <span style={{ fontSize: 50, color: todo.bgcolor, fontWeight: 500}}>{dayLabel}</span>
            } 
            else if(day.status === true) {
              return todo.successIcon !== "" ? <EmojiWrapper unified={todo.successIcon ?? ""} size={50} /> : null
            }
            else if (day.status === false) {
              return todo.errorIcon !== "" ? <EmojiWrapper unified={todo.errorIcon ?? ""} size={50} /> : null
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
        )
      ) : (
        <div>false</div>
      )}

    </div>
  )
}

export default TodoLayout

{/* todo.days.map((day, index) => {
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
      )} */}