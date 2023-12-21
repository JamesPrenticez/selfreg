import React, { useState, type ReactElement } from "react";
import { pages } from "@constants";
import RightNav from "./RightNav";
import Hamburger from "./Hamburger";
import CompanyLogo from "./CompanyLogo";
import WeekNumber from "./WeekNumber";
import { project } from "@constants";
import { useAppSelector } from "@redux/hooks";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useAppSelector(state => state.user)

  return (
    <>
      <div className="h-[4rem] md:h-[5rem] bg-primary flex font-semibold px-4">
        <div className="flex justify-between items-center max-w-7xl w-full mx-auto">
          <CompanyLogo onClick={() => setIsMenuOpen(false)}/>

          { user ? (
            <WeekNumber />
          ) : (
            <h1 className="text-major text-3xl md:text-5xl">
              {project.name}
            </h1>
          )}
          
          <Hamburger 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={() => { setIsMenuOpen((prevState) => !prevState) }}
          /> 
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