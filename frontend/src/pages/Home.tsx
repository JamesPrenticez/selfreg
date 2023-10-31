import React, { useEffect, type ReactElement } from "react";
import { NavLink } from "react-router-dom";
import TodoLayout from "@components/todos/TodoLayout";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getTodos, getDaysForTodos } from "@redux/thunk/todosThunk";
import dayjs from "dayjs";

const Home = (): ReactElement => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos);
  const week = useAppSelector((state) => state.week);

  useEffect(() => {
    dispatch(getTodos({ user_id: '123456' }))
      .then(() => {
        if(week.data){
          dispatch(getDaysForTodos({
            start_date: week.data.start_date,
            end_date: week.data.end_date
          }));
        }
      });
  }, [week.data]); 

  console.log(todos.data)

  return (
    <div className="w-full mx-auto min-h-screenNav bg-white"> 
      <div className="grid grid-col min-h-screenNav bg-red-500">

      {todos.data ? (
        todos.data.map((todo) => (
        <div key={todo._id} className="flex px-4" style={{background: todo.bgcolor}}>
          <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">

              <div className="w-full md:w-[500px] flex items-center py-4">
                <NavLink key={todo._id} to={todo.slug ?? "/"} className="cursor-pointer">
                  <h1 className="text-white font-bold text-2xl md:text-5xl" style={{color: todo.color}}>
                    {todo.title}
                  </h1>
                </NavLink>
              </div>

              <div 
                className="flex flex-col md:flex-row flex-grow px-2"
                onClick={(e) => {
                  e.preventDefault(); // Prevent NavLink from firing
                }}
              >
                <TodoLayout todo={todo} />
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

export default Home;

// Quadrant
// const Home = (): ReactElement => {
//   return (
//     <Body>
//       <div className="grid grid-cols-2 min-h-screenNav bg-red-500">
//         {data.map((item) => (
//           <NavLink key={item.id} to={item.url} className="flex flex-col justify-center items-center cursor-pointer" style={{background: item.bgcolor}}>
//             <h1 className="text-white font-bold text-2xl md:text-5xl" style={{color: item.color}}>
//               {item.name}
//             </h1>
//           </NavLink>
//         ))}
//       </div>
//     </Body>
//   );
// };


