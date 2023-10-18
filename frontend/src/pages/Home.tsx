import React, { type ReactElement } from "react";
import Body from "../components/layout/Body";
import { Link, NavLink } from "react-router-dom";
import { mockTodos } from '@mocks'
import type { IValidTasks } from "@models";
import TodoLayout from "@components/todos/TodoLayout";
import dayjs from "dayjs";



const validTasks: IValidTasks[] = [
  {_id: "1", task_name: "Sleep", slug:"/sleep", color:"#7dd3fc", bgcolor: "#3b82f6", icon: undefined},
  {_id: "2", task_name: "Exercise", slug:"/exercise", color:"#8B0000", bgcolor: "#facc15", icon: undefined},
  {_id: "3", task_name: "Meditation", slug:"/meditation", color:"#bbf7d0", bgcolor: "#22c55e", icon: undefined},
  {_id: "4", task_name: "Business", slug:"/business", color:"#facc15", bgcolor: "#9333ea", icon: undefined},
]

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

// Lines
const Home = (): ReactElement => {


  const today = dayjs() // TODO add this to global state

  // There is some database logic
  // Sends todays date
  // Returns list of todos that fall within the given week/year
  // If there is no todo with the 'task_name' then create it


  return (
    <Body>
      <div className="grid grid-col min-h-screenNav bg-red-500">
        {validTasks.map((item) => {
          // Find first instance
          const matchingTodo = mockTodos.find(obj => obj.task_name === item.task_name);
          // Find all innstances
          // const matchingTodos = mockTodos.filter(obj => obj.task_name === item.task_name);

          const renderMatchingTodos = () => {
            if(matchingTodo) {
              return (
                <TodoLayout todo={matchingTodo}/>
              )
            } else {
              // create todo
              // item.task_name + today = dayjs()
              
              return (
                <div>not matching</div>
              )
            }
          }

          return (
            <NavLink key={item._id} to={item.slug} className="flex flex-col cursor-pointer px-4" style={{background: item.bgcolor}}>

              <div className="w-full flex items-center py-4">
                <h1 className="text-white font-bold text-2xl md:text-5xl" style={{color: item.color}}>
                  {item.task_name}
                </h1>
              </div>

              <div className="flex flex-col flex-grow px-2">
                {renderMatchingTodos()}
              </div>

            </NavLink>
          )}
      )}
      </div>
    </Body>
  );
};

export default Home;
