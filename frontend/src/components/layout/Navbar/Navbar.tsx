import React, { useState, type ReactElement } from "react";
import { pages } from "@constants";
import RightNav from "./RightNav";
import Hamburger from "./Hamburger";
import CompanyLogo from "./CompanyLogo";
import WeekNumber from "./WeekNumber";

function Navbar(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="h-[4rem] md:h-[5rem] bg-primary text-muted flex font-semibold px-4">
        <div className="flex justify-between items-center max-w-7xl w-full mx-auto">
          <CompanyLogo onClick={() => setIsMenuOpen(false)}/>

          <WeekNumber />

          <div className="flex space-x-4">
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