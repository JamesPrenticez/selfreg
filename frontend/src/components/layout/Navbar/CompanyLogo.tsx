import Logo from '@components/common/Logo';
import React from 'react'
import { NavLink } from "react-router-dom";

function CompanyLogo({onClick}: {onClick: () => void}){
  return (
    <NavLink to="/">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Logo className="w-10 md:w-12" {...{onClick}}/>
      </div>
    </NavLink>
  )
}

export default CompanyLogo;