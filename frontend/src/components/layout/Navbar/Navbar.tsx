import React, { Children, ReactNode, useState, type ReactElement } from "react";
import { navigationItemsForAuthenticedUsers, navigationItemsForHomepage } from "@constants";
import RightNav from "./RightNav";
import Hamburger from "./Hamburger";
import CompanyLogo from "./CompanyLogo";
import WeekNumber from "./WeekNumber";
import { NavLink, useLocation } from "react-router-dom";
import { project } from "@constants";
import CompanyName from "./CompanyName";
import { Button } from "@components/ui";
import { Paths } from "@models";
import { capitalizeFirstLetter } from "@utils";



function Navbar(): ReactElement {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // TODO isAuth not home...
  if(location.pathname === "/"){
    return (
      <NavbarWrapper>
        <div className="flex">
          <CompanyLogo onClick={() => setIsMenuOpen(false)}/>
          <CompanyName />
        </div>

        <ul className="flex space-x-4">
          {navigationItemsForHomepage.map((page, _) => (
            <li key={page.name}>
              <NavLink to={page.path} tabIndex={-1}>
                <Button variant="link" color="muted" className="p-0">
                  {capitalizeFirstLetter(page.name)}
                </Button>
              </NavLink>
            </li>
          ))}
        </ul>

        <div
        //  className="ml-auto"
        >
          <NavLink to={Paths.LOGIN}>
            <Button variant="link" color="muted" className="ml-auto px-4">
              Login
            </Button>
          </NavLink>
          <NavLink to={Paths.REGISTER}>
            <Button color="cta" className="px-4 ">
              Get Started
            </Button>
          </NavLink>
        </div>
      </NavbarWrapper>
    )
  }

  return (
    <>
      <div className="h-[4rem] md:h-[5rem] bg-[#111815] text-muted flex font-semibold px-4">
        <div className="flex items-center max-w-7xl w-full mx-auto">
          <CompanyLogo onClick={() => setIsMenuOpen(false)}/>

          <WeekNumber />

          <div className="flex space-x-4 ml-auto">
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
        menuItems={navigationItemsForAuthenticedUsers}
      />
    </>
  );
};

interface NavbarWrapperProps {
  children: ReactNode;
}

const NavbarWrapper = ({children}: NavbarWrapperProps) => {
  return (
    <div className="h-[4rem] md:h-[5rem] bg-tarantula flex font-[400] text-[16px] px-4">
      <div className="flex items-center justify-between max-w-7xl w-full mx-auto">
        {children}
      </div>
  </div>
  )
}

export default Navbar;