import React, { useState, type ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { project, pages } from "../../constants";
import Logo from "../common/Logo";

const Navbar = (): ReactElement => {
  return (
    <div className="h-[4rem] md:h-[5rem] bg-gray-900 flex font-semibold px-4">
      <div className="flex justify-between items-center max-w-7xl w-full mx-auto">

        <LogoAndName />
        <Hamburger />
        <NavigationItems />

      </div>
    </div>
  );
};

export default Navbar;

function LogoAndName(){
  return (
    <NavLink to="/">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Logo className="w-10 md:w-8" />
        <h1 className="hidden md:block text-2xl text-gray-50 hover:text-gray-300">
          {project.name.toUpperCase()}
        </h1>
      </div>
    </NavLink>
  )
}

function Hamburger(){
  const [isOpen, setIsOpen] = useState(false)

  const baseClass = "bg-gray-50 block h-1 w-8 rounded transform transition-all duration-200 ease-in-out";

  return (
    <button 
      className="text-white md:hidden ml-auto outline-none" 
      onClick={() => setIsOpen((prev) => !prev)}
      aria-label="Navigation Menu"
    >
      <div className="block relative">
        {/* top */}
        <span className={`${baseClass} mb-1 ${isOpen && 'opacity-0'}`}></span>
        {/* two in the middle */}
        <span className={`${baseClass} absolute ${isOpen && '-rotate-45'}`}></span>
        <span className={`${baseClass} absolute ${isOpen && 'rotate-45'}`}></span>
        {/* bottom */}
        <span className={`${baseClass} mt-3 ${isOpen && 'opacity-0'}`}></span>
      </div>
    </button>
  )
}

function NavigationItems(){
  return (
    <div className="hidden md:flex space-x-2 cursor-pointer">
      {pages.map(
        (page) =>
          !page.requiresAuth && (
            <NavLink
              key={page.name}
              to={page.url}
              style={({ isActive }) =>
                isActive
                  ? { color: "  #0F0" }
                  : { color: "rgb(249 250 251)" }
              }
            >
              <p className="hover:text-[#0F0]">{page.name}</p>
            </NavLink>
          )
      )}
    </div>
  )
}