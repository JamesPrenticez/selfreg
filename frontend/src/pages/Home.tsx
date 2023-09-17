import React, { type ReactElement } from "react";
import Body from "../components/layout/Body";
import { Link, NavLink } from "react-router-dom";

const data = [
  {id: 3, name: "Sleep", url:"/sleep", color:"#7dd3fc", bgcolor: "#3b82f6", icon: undefined},
  {id: 2, name: "Exercise", url:"/exercise", color:"#8B0000", bgcolor: "#facc15", icon: undefined},
  {id: 1, name: "Meditation", url:"/meditation", color:"#bbf7d0", bgcolor: "#22c55e", icon: undefined},
  {id: 4, name: "Business", url:"/business", color:"#facc15", bgcolor: "#9333ea", icon: undefined},
]

// #9333ea

const Home = (): ReactElement => {
  return (
    <Body>
      <div className="grid grid-cols-2 min-h-screenNav bg-red-500">

        {data.map((item) => (
          <NavLink key={item.id} to={item.url} className="flex flex-col justify-center items-center cursor-pointer" style={{background: item.bgcolor}}>
            <h1 className="text-white font-bold text-2xl md:text-5xl" style={{color: item.color}}>
              {item.name}
            </h1>
          </NavLink>
        ))}

      </div>
    </Body>
  );
};

export default Home;
