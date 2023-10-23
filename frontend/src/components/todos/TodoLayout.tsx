import React from 'react'
import type { ITodo } from '@models';
import dayjs from 'dayjs';
import EmojiWrapper from '@components/emoji/EmojiWrapper';

interface Props {
  todo: ITodo;
}

function TodoLayout({todo}: Props) {

  const renderTodoBoxes = () => {
    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    // Effectivly a loading state
    if(todo.days === undefined || todo.days.length < 7){
      return Array.from({ length: 7 }, (_, index) => (
        <p 
          key={index}
          className='bg-white/40 hover:bg-white/80 rounded-lg w-full aspect-square flex items-center justify-center'
        >
          {index}
        </p>
      ));
    }
    
    return todo.days.map((day, index) => {

      const renderTodoStatusIcon = () => {
        if (day.status === null) {
          // const dayOfWeek = dayjs(day.date).day() // for certainty we could replace dayLabel[index] with dayjs calc which returns a number
          return <span style={{ fontSize: 50, color: todo.bgcolor ?? "white", fontWeight: 500}}>{dayLabels[index]}</span>
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
          {renderTodoStatusIcon()}
        </div>
      )
    })
  }


  return (
    <div className='grid grid-cols-7 h-full items-center justify-center w-full gap-x-2'>
      {renderTodoBoxes()}
    </div>
  )
}

export default React.memo(TodoLayout);
