import React, { useState, type ReactElement, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { project, pages } from "../../constants";
import Logo from "../common/Logo";
import { useClickAwayListener } from "@hooks";
import { INavigationItem, IUserPermissions } from "@models";
import { useAppSelector } from "@redux/hooks";
import { userHasPermission } from "@utils";
import { persistor } from "@redux/store";
import dayjs from "dayjs";
// import { ReactComponent as FlagIcon } from "./badges/flag.svg";

const Navbar = (): ReactElement => {
  const menuContainerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isClickedAway = useClickAwayListener(menuContainerRef); // return true or false

  useEffect(() => {
    if(isClickedAway) setIsMenuOpen(false)
  }, [isClickedAway])

  return (
    <div className="h-[4rem] md:h-[5rem] bg-gray-900 flex font-semibold px-4">
      <div className="flex justify-between items-center max-w-7xl w-full mx-auto">

        <CompanyLogo />
        <WeekNumber />
        <div ref={menuContainerRef} className="relative" onClick={() => { setIsMenuOpen((prevState) => !prevState) }}>
          <Avatar {...{isMenuOpen}} />
          <AvatarBadge />
          <Hamburger />
          <Menu {...{isMenuOpen}}/>
        </div>

      </div>
    </div>
  );
};

function CompanyLogo(){
  return (
    <NavLink to="/">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Logo className="w-12 md:w-12" />
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
      <h1 className="text-5xl text-gray-50/80">
        WEEK {week.data?.week_number}
      </h1>
    </div>
  )

}

function Avatar ({isMenuOpen}: {isMenuOpen: boolean}) {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="hidden md:flex space-x-4 items-center">
      {/* <p className="text-gray-50/80">{dayjs.locale()}</p> */}
      {/* <p className="text-gray-50/80">{user.data?.email}</p> */}
      <div className={`block rounded-full bg-cover bg-center cursor-pointer border-2  hover:border-gray-50/60 ${isMenuOpen ? "border-gray-50/60" : "border-gray-50/20"} text-white w-12 h-12 overflow-hidden`}>
        {user.data?.profilePicture ? (
            <img 
              width={48}
              height={48}
              src={user.data.profilePicture}
              alt=""
            />
          ) : (
            <svg
              viewBox="0 0 240 240" 
              xmlns="http://www.w3.org/2000/svg"
              // fill="#00ff00"
              width="90%" height="90%"
              className="mx-auto mt-[15%] fill-gray-50/60"
            >
              <path d=" M 110.50 12.80 C 125.87 10.23 142.19 14.07 154.83 23.17 C 164.42 30.03 171.94 39.75 176.08 50.79 C 181.37 64.54 181.25 80.28 175.79 93.95 C 170.63 107.17 160.59 118.41 148.03 125.02 C 137.09 130.85 124.27 133.14 112.00 131.42 C 95.76 129.35 80.65 120.12 71.18 106.80 C 60.74 92.37 57.34 73.16 62.19 56.02 C 68.06 33.83 87.80 16.18 110.50 12.80 Z" />
              <path d=" M 46.31 169.28 C 72.25 153.16 103.80 148.21 133.89 150.57 C 160.01 152.64 186.35 161.27 206.37 178.63 C 215.06 186.29 222.73 195.65 226.41 206.77 C 228.79 213.60 227.79 220.92 228.00 228.00 C 156.00 228.00 84.00 228.00 12.00 228.00 C 12.18 220.38 11.13 212.46 14.11 205.21 C 20.02 189.80 32.62 177.96 46.31 169.28 Z" />
            </svg>
          )
        }

      </div>
    </div>
   );
};

function Hamburger(){
  const [isOpen, setIsOpen] = useState(false)

  const baseClass = "bg-gray-50 block h-1 w-[32px] rounded transform transition-all duration-200 ease-in-out";

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

function AvatarBadge(){
  return (
    <div className="hidden md:absolute -right-[10px] -bottom-[5px] w-6 h-6">
      <img src="./badges/30day.svg" width="100%" height="100%" alt="" />

    </div>
  )

}

export default Navbar;
