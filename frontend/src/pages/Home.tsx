import React, { useEffect, type ReactElement, useState } from "react";
import Body from "../components/layout/Body";
import { NavLink } from "react-router-dom";
import { mockTodos } from '@mocks'
import TodoLayout from "@components/todos/TodoLayout";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
// import { getUser } from "@redux/thunk/userThunk";
import api from "@api";
import { ITodo } from "@models";

const Home = (): ReactElement => {
  const today = dayjs() // TODO add this to global state

  // There is some database logic
  // Sends todays date
  // Returns list of todos that fall within the given week/year
  // If there is no todo with the 'task_name' then create it

  // const dispatch = useAppDispatch()
  // const data = useAppSelector((state) => state.user.payload)

  // useEffect(() => {
  //   void dispatch(getUser());
  // }, [dispatch])
  const [todos, setTodos] = useState<ITodo[] | undefined>(undefined)

  interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }

  const params = {
    user_id: "123456",
    start_date: "2023-09-14",
    end_date: "2023-09-16",
  };

  useEffect(() => {
    api.get<ITodo[]>('/todos', params)
      .then((res) => {
        setTodos(res.data)
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, []); 

  console.log(todos)

  return (
    <div className="w-full mx-auto min-h-screenNav bg-white"> 
      <div className="grid grid-col min-h-screenNav bg-red-500">
        {todos? (
          todos.map((todo) => (
            <NavLink key={todo._id} to={todo.slug ?? "/"} className="flex cursor-pointer px-4" style={{background: todo.bgcolor}}>
              <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">

                <div className="w-full md:w-[500px] flex items-center py-4">
                  <h1 className="text-white font-bold text-2xl md:text-5xl" style={{color: todo.color}}>
                    {todo.title}
                  </h1>
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
            </NavLink>
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