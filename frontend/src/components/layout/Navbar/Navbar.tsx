import React, { useState, type ReactElement } from "react";
import { pages } from "@constants";
import RightNav from "./RightNav";
import Hamburger from "./Hamburger";
import CompanyLogo from "./CompanyLogo";
import WeekNumber from "./WeekNumber";
import { project } from "@constants";
import { useAppSelector } from "@redux/hooks";
import { PlusCircleIcon } from "@components/icons";
import AddHabit from "./AddHabit";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCreateModalOpen, setIsOpen] = useState(false)
  const user = useAppSelector(state => state.user)

  return (
    <>
      <div className="h-[4rem] md:h-[5rem] bg-primary text-muted flex font-semibold px-4">
        <div className="flex justify-between items-center max-w-7xl w-full mx-auto">
          <CompanyLogo onClick={() => setIsMenuOpen(false)}/>

          <WeekNumber />
          {/* { !user.isAuthenticated ? (
            <WeekNumber />
          ) : (
            <h1 className="text-muted text-3xl md:text-5xl">
              {project.name}
            </h1>
          )} */}

          <div className="flex space-x-4">
            {user.isAuthenticated &&
              <AddHabit />
            }
          
            <Hamburger 
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={() => { setIsMenuOpen((prevState) => !prevState) }}
            /> 
          </div>
        </div>
      </div>
      <RightNav
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={() => { setIsMenuOpen((prevState) => !prevState) }}
        menuItems={pages}
      />
    </>
  );
};

export default Navbar;