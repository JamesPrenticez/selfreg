import React, { useState, type ReactElement, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { project, pages } from "@constants";
import Logo from "../common/Logo";
import { useClickAwayListener } from "@hooks";
import { INavigationItem, IUserPermissions } from "@models";
import { useAppSelector } from "@redux/hooks";
import { getInitials, userHasPermission } from "@utils";
import { persistor } from "@redux/store";
import dayjs from "dayjs";
import RightNav from "./RightNav";
// import { ReactComponent as FlagIcon } from "./badges/flag.svg";


const Navbar = (): ReactElement => {
  const menuContainerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="h-[4rem] md:h-[5rem] bg-primary flex font-semibold px-4">
        <div className="flex justify-between items-center max-w-7xl w-full mx-auto">
          <CompanyLogo onClick={() => setIsMenuOpen(false)}/>
          <WeekNumber />
          <div ref={menuContainerRef} className="relative" onClick={() => { setIsMenuOpen((prevState) => !prevState) }}>
            <Hamburger />

          </div>
        </div>
      </div>
      <RightNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen}
        menuItems={pages}
      />
    </>
  );
};

function CompanyLogo({onClick}: {onClick: () => void}){
  return (
    <NavLink to="/">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Logo className="w-10 md:w-12" {...{onClick}}/>
        {/* <h1 className="hidden md:block text-2xl text-gray-50/80 hover:text-gray-300">
          {project.name.toUpperCase()}
        </h1> */}
      </div>
    </NavLink>
  )
}

function WeekNumber(){
  const week = useAppSelector((state) => state.week)

  return (
    <div>
      <h1 className="text-3xl md:text-5xl text-muted">
        WEEK {week.data?.week_number}
      </h1>
    </div>
  )

}






function Hamburger(){
  const [isOpen, setIsOpen] = useState(false)

  const baseClass = "bg-secondary-muted block h-1 w-[32px] rounded transform transition-all duration-200 ease-in-out";

  return (
    <button 
      className="ml-auto outline-none" 
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

function Menu({isMenuOpen}: {isMenuOpen: boolean}){
  const user = useAppSelector((state) => state.user);

  return (
    <div 
      className={`
    bg-gray-50
      absolute 
      top-[45px]
      md:top-[65px]
      right-0
      w-[400px]
      h-[375px]
      shadow-[6px_6px_6px_0px_rgba(0,0,0,0.3)]

      rounded-md
      p-[32px]
      z-50
      ${isMenuOpen  ? 'visible' : 'hidden'}
    `}
    >
      {/* Triangle */}
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox='0 0 60.666 55.214'
        height={22}
        width={24}
        className="
         absolute
         fill-gray-50
         top-[-15px]
         right-[4px]
         md:right-[12px]
        "
      >
        <path 
          d="M275.649,287.65,255.41,322.7a9.58,9.58,0,0,0,8.3,14.37h40.478a9.58,9.58,0,0,0,8.3-14.37L292.241,287.65A9.579,9.579,0,0,0,275.649,287.65Z" 
          transform="translate(-253.612 -282.36)"
          strokeMiterlimit="10" 
        />
      </svg>

      <div className="bg-gray-400 cursor-pointer items-center">
        {pages.map((item) => (
          <MenuItem key={item._id} {...{...item}}/>
        ))}
      </div>

      {userHasPermission(user.data, IUserPermissions.ADMIN) &&
        <AdminMenuItems />
      }


    </div>
  )
}

function MenuItem(page: INavigationItem){
  return (
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
}

function AdminMenuItems(){
  return (
    <div>
      <div className="bg-red-500 text-white font-bold">
        ADMIN
      </div>
      <div className="flex p-2">
        <div>
          <p className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white rounded-md px-4 py-2" onClick={() => { 
            persistor.purge().then(() => {
              window.location.reload();
            });
           }}>PURGE</p>
        </div>
      </div>
    </div>
  )
}



export default Navbar;
