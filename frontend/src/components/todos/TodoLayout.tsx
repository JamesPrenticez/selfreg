import React from 'react'
import type { IDay, ITodo } from '@models';
import dayjs from 'dayjs';
import { dayLabels } from '@constants'
import EmojiWrapper from '@components/emoji/EmojiWrapper';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '@redux/hooks';
import { updateDayStatusByTodoId } from '@redux/slices';

interface Props {
  todo: ITodo;
}

function TodoLayout({
  todo,
}: Props) {

  const dispatch = useDispatch();
  const week = useAppSelector((state) => state.week);

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

  const buildWeekArray = (data: IDay[], start_date: string, end_date: string) => {
    let date = dayjs(start_date); 
    const endDate = dayjs(end_date);
    const resultArray = [];
  
    while (date.isBefore(endDate) || date.isSame(endDate)) {
      const existingData = data.find(item => item.date === date.format('YYYY-MM-DD'));
      if (existingData) {
        resultArray.push(existingData);
      } else {
        const emptyDay: IDay = {
          _id: "",
          todo_id: todo._id,
          date: date.format('YYYY-MM-DD'),
          status: null,
        }
        resultArray.push(emptyDay);
      }
      date = date.add(1, 'day');
    }
  
    return resultArray;
  }

  const renderTodoBoxes = () => {
    let weekArray: IDay[] = []

    if(todo.days === undefined){
      return <div>loading...</div>
    } 

    if(todo.days.length < 7){
      if(!week.data) return <div>Error - no week data</div>
      weekArray = buildWeekArray(todo.days, week.data.start_date, week.data.end_date);
    } 

    if(todo.days.length > 7){
      const filteredDays = todo.days.filter(
        (day) => {
          if(week.data){
            day.date >= week.data.start_date &&
            day.date <= week.data.end_date
          }
        }
      );
          
      weekArray = filteredDays
    }

    if(todo.days.length === 7){
      weekArray = todo.days
    }

    return weekArray.map((day, index) => {

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
          className='bg-white/40 hover:bg-white/80 rounded-lg w-full aspect-square flex items-center justify-center cursor-pointer'
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


// const renderTodoBoxes = () => {
//   const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // // Effectivly a loading state
  // if(todo.days === undefined || todo.days.length < 7){
  //   return Array.from({ length: 7 }, (_, index) => (
  //     <p 
  //       key={index}
  //       className='bg-white/40 hover:bg-white/80 rounded-lg w-full aspect-square flex items-center justify-center'
  //       // TODO add shine animation to this
  //     >
  //       {index}
  //     </p>
  //   ));
  // }
  
//   return todo.days.map((day, index) => {

//     const renderTodoStatusIcon = () => {
//       if (day.status === null) {
//         return <span style={{ fontSize: 50, color: todo.bgcolor ?? "white", fontWeight: 500}}>{dayLabels[index]}</span>
//       } 
//       else if(day.status === true) {
//         return todo.successIcon !== "" ? <EmojiWrapper unified={todo.successIcon ?? ""} size={50} /> : null
//       }
//       else if (day.status === false) {
//         return todo.errorIcon !== "" ? <EmojiWrapper unified={todo.errorIcon ?? ""} size={50} /> : null
//       } 
//     }
    
//     return (
//       <div 
//         key={day.date}
//         className='bg-white/40 hover:bg-white/80 rounded-lg w-full aspect-square flex items-center justify-center'
//         onClick={() => { handleUpdateStatus(todo._id, day._id, day.status ) }}
//       >
//         {renderTodoStatusIcon()}
//       </div>
//     )
//   })
// }