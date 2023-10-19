import React, { type ReactElement } from "react";
import Body from "../components/layout/Body";
import { NavLink } from "react-router-dom";
import { mockTasks, mockTodos } from '@mocks'
import TodoLayout from "@components/todos/TodoLayout";
import dayjs from "dayjs";

const Home = (): ReactElement => {
  const today = dayjs() // TODO add this to global state

  // There is some database logic
  // Sends todays date
  // Returns list of todos that fall within the given week/year
  // If there is no todo with the 'task_name' then create it


  return (
    <div className="w-full mx-auto min-h-screenNav bg-white"> 
      <div className="grid grid-col min-h-screenNav bg-red-500">
        {mockTasks.map((task) => {
          // Find first instance
          const matchingTodo = mockTodos.find(todo => todo.task_name === task.task_name);
          // Find all innstances
          // const matchingTodos = mockTodos.filter(obj => obj.task_name === item.task_name);

          const renderMatchingTodos = () => {
            if(matchingTodo) {
              return (
                <TodoLayout 
                  task={task}
                  todo={matchingTodo}
                />
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
            <NavLink key={task._id} to={task.slug} className="flex cursor-pointer px-4" style={{background: task.bgcolor}}>
              <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">

                <div className="w-full md:w-[500px] flex items-center py-4">
                  <h1 className="text-white font-bold text-2xl md:text-5xl" style={{color: task.color}}>
                    {task.task_name}
                  </h1>
                </div>

                <div 
                  className="flex flex-col md:flex-row flex-grow px-2"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent NavLink from firing
                  }}
                >
                  {renderMatchingTodos()}
                </div>

              </div>
            </NavLink>
          )}
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