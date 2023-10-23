import React from 'react'
import type { ITodo } from '@models';
import dayjs from 'dayjs';
import EmojiWrapper from '@components/emoji/EmojiWrapper';
import { useDispatch } from 'react-redux';
import { updateDayStatusByTodoId } from '@redux/slices';

interface Props {
  todo: ITodo;
}

function TodoLayout({todo}: Props) {

  const dispatch = useDispatch();

  // Example function to update status
  const handleUpdateStatus = (todo_id: string, day_id: string, current_status: boolean | null) => {
    console.log(current_status);
    let new_status = current_status === null 
      ? true 
    : current_status === true 
      ? false 
    : current_status === false
      ? true
    : null;
    dispatch(updateDayStatusByTodoId({ todo_id, day_id, new_status }));
  };


  const renderTodoBoxes = () => {
    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    // Effectivly a loading state
    if(todo.days === undefined || todo.days.length < 7){
      return Array.from({ length: 7 }, (_, index) => (
        <p 
          key={index}
          className='bg-white/40 hover:bg-white/80 rounded-lg w-full aspect-square flex items-center justify-center'
          // TODO add shine animation to this
        >
          {index}
        </p>
      ));
    }
    
    return todo.days.map((day, index) => {

      const renderTodoStatusIcon = () => {
        if (day.status === null) {
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
          className='bg-white/40 hover:bg-white/80 rounded-lg w-full aspect-square flex items-center justify-center'
          onClick={() => { handleUpdateStatus(todo._id, day._id, day.status ) }}
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

export default TodoLayout;
