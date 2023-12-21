import React, { useEffect, useState, ReactElement } from "react";
import { persistor } from "@redux/store";
import { Button } from "@components/common";
import { ArrowLeftIcon, CrossIcon } from "@components/icons";
import { Link, useLocation } from "react-router-dom";
import { INavigationItem } from "@models";
import Avatar from "./Avatar";
// import "./RightNotifictaions.scss"

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
  menuItems: INavigationItem[];
}

function RightNav({ isMenuOpen, setIsMenuOpen, menuItems }: Props) {
  const location = useLocation();

  return (
    <div 
      className={`fixed inset-[60px_0_0_0] md:inset-[80px_0_0_0] bg-slate-900/80 z-50 
        ${isMenuOpen ? "block" : "hidden" }
      `}
      // onClick={setIsMenuOpen}
    >
        <div className="absolute right-0 bg-muted h-full w-full md:w-[450px] p-6 space-y-2 text-muted flex flex-col">
          
          <div className="flex flex-col grow">
            <Link to="/">
              <h1 
                className={`text-2xl font-bold mb-6 hover:text-major
                  ${location.pathname === "/" ? 'text-major hover:text-major' : 'text-muted'}
              `}>Self Regulator</h1>
            </Link>

            <div className="flex">
              <Avatar />
              <div className="ml-6">
                <h2 className="text-lg font-bold">James Prentice</h2>
                <h3>prenticez@hotmail.co.nz</h3>
              </div>
            </div>

            <div className="pt-6 select-none">
              {menuItems.map((item: any, index: any) => (
                <Link
                  key={index}
                  to={item.url}
                  onClick={setIsMenuOpen}
                  className={`flex space-x-4 py-2 hover:text-white font-medium
                    ${location.pathname === item.url ? 'text-major hover:text-major' : 'text-muted'}
                  `}
                >
                  <span className="flex items-center text-major">
                    {item.icon} 
                  </span>
                  <p>
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p
              className="cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white rounded-md px-4 py-2 text-center" 
              onClick={() => { 
                persistor.purge().then(() => {
                  window.location.reload();
                });
              }}
            >
              DELETE YOUR DATA
            </p>
          </div>
        </div>
      </div>


  )
};

export default RightNav;
