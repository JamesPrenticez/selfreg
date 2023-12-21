import React, { useEffect, useState, ReactElement } from "react";

import { Button } from "@components/common";
import { ArrowLeftIcon, CrossIcon } from "@components/icons";
import { Link, useLocation } from "react-router-dom";
import { INavigationItem } from "@models";
import Avatar from "./Avatar";
// import "./RightNotifictaions.scss"

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuItems: INavigationItem[];
}

function RightNav({ isOpen, onClose, menuItems }: Props) {
  const location = useLocation();

  return (
    <div className={`fixed inset-[60px_0_0_0] md:inset-[80px_0_0_0] bg-slate-900/80 z-50 ${isOpen ? "flex" : "hidden" }`}>
      <div className="absolute right-0 bg-muted h-full w-full md:w-[450px]  p-6 space-y-2 text-muted">
          
          <h1 className=" text-2xl font-bold mb-6">Self Regulator</h1>

          <div className="flex">
            <Avatar />
            <div className="ml-6">
              <h2 className="text-lg font-bold">James Prentice</h2>
              <h3>prenticez@hotmail.co.nz</h3>
            </div>
          </div>

          <div className="pt-6">
            {menuItems.map((item: any, index: any) => (
              <Link
                key={index}
                to={item.path}
                className={`block py-2 hover:text-white
                  ${location.pathname === item.url ? 'text-major' : 'text-muted'}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

      </div>
    </div>


  )
};

export default RightNav;
