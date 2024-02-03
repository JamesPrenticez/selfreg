import React, { useEffect, useState, type ReactElement } from "react";
import { NavLink } from "react-router-dom";
import TodoLayout from "@components/todos/TodoLayout";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getTodos, getDaysForTodos } from "@redux/thunk/todosThunk";
import dayjs from "dayjs";
import { dayLabels } from '@constants'
import { IDay } from "@models";

import 'dayjs/locale/en-gb'; // Import the locale you want to use
import { getWeekData } from "@utils";
import SuccessAnimation from "@components/common/Success";

dayjs.locale('en-gb'); // Set the locale globally

const Habits = (): ReactElement => {
  // const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos);
  const week = getWeekData()

  // useEffect(() => {
  //   dispatch(getTodos({ user_id: '123456' }))
  //     .then(() => {
  //       if(week.data){
  //         dispatch(getDaysForTodos({
  //           start_date: week.data.start_date,
  //           end_date: week.data.end_date
  //         }));
  //       }
  //     });
  // }, [week.data]); 

  const todo_data = todos.data 
  const start_date = week.start_date
  const end_date = week.end_date


  // console.log(start_date)
  // console.log(end_date)

  // const buildWeekArray = (data: IDay[], start_date: string, end_date: string) => {
  //   let date = dayjs(start_date); 
  //   const endDate = dayjs(end_date);
  //   const resultArray = [];
  
  //   while (date.isBefore(endDate) || date.isSame(endDate)) {
  //     const existingData = data.find(item => item.date === date.format('YYYY-MM-DD'));
  //     if (existingData) {
  //       resultArray.push(existingData);
  //     } else {
  //       const emptyDay: IDay = {
  //         _id: "",
  //         todo_id: "random_id",
  //         date: date.format('YYYY-MM-DD'),
  //         status: null,
  //       }
  //       resultArray.push(emptyDay);
  //     }
  //     date = date.add(1, 'day');
  //   }
  
  //   return resultArray;
  // }


  // if(todo_data){
  //   if(todo_data[3].days)
  //   console.log(buildWeekArray(todo_data[3].days, start_date, end_date))
  // }

  console.log(todo_data)

  return (
    <div className="w-full mx-auto min-h-screenNav pt-8"> 
      <div className="grid grid-col min-h-screenNav gap-8">

      {todos.data ? (
        
        todos.data.map((todo) => (
        <div key={todo._id} className="flex px-4" >
          <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">


              <div className="w-full md:w-[500px] flex items-center pt-2 md:py-4 ">
                <h1 className="text-white font-bold text-[40px] md:text-5xl" style={{color: todo.color}}>
                  {todo.title}
                </h1>
                <div className="h-6 w-6 rounded-full ml-auto border-2" style={{borderColor: todo.bgcolor}}></div>
              </div>


              <div className='grid grid-cols-7 h-full items-center justify-center w-full gap-x-2 mt-2'>
              {dayLabels.map((day, index) => {
                const [ isActive, setIsActive] = useState(false)

                return (
                  <div
                    onClick={() => setIsActive(prev => !prev)}
                    key={index} 
                    className='border-2 border-white/40 rounded-lg w-full aspect-square flex items-center justify-center cursor-pointer relative'
                    
                  >
                    {isActive ? 
                    <SuccessAnimation isActive={isActive} />
                    :
                    <p className="text-gray-300/60">{day}</p>
                    }
                  </div>
              )})}
              </div>

            </div>
          </div>
        ))
      ) : (
        <p>loading...</p>
      )}
      
      </div>
    </div>
  );
};

export default Habits;



              {/* <div 
                className="flex flex-col md:flex-row flex-grow px-2"
                onClick={(e) => {
                  e.preventDefault(); // Prevent NavLink from firing
                }}
              >
                <div className="text-white">
                  {dayjs(week.current_date).format("D MMM")}
                </div>
              </div> */}

                {/* <TodoLayout todo={todo} /> */}
