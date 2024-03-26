import { Paths } from '@models';
import React from 'react'
import { NavLink } from 'react-router-dom'

const CompanyName = () => {
  return (
    <NavLink to={Paths.HOME}>
      <h1 className="cursor-pointer text-[20px] ml-4 text-white font-[600] font-[inter]">SELF <span className="font-[200]">REGULATOR</span></h1>
    </NavLink>
  )
}

export default CompanyName;