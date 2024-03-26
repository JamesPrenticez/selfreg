import Logo from '@components/common/Logo';
import LogoReverse from '@components/common/LogoReverse';
import React from 'react'
import { NavLink } from "react-router-dom";

function CompanyLogo({onClick}: {onClick: () => void}){
  return (
    <NavLink to="/">
      <div className="flex items-center cursor-pointer">
        <Logo className="w-[33px]" {...{onClick}}/>
        {/* <LogoReverse className="w-[33px]" {...{onClick}}/> */}
      </div>
    </NavLink>
  )
}

export default CompanyLogo;