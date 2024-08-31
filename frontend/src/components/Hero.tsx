import React from 'react'
import { project } from '@constants'
import { NavLink } from 'react-router-dom'
import { Button } from './ui'
import { Paths } from '@models'

function Hero() {
  return (
    <div className='flex justify-between gap-4'>

      <div>
        <h1 className='text-7xl'>{project.hero1}</h1>
        <h1 className='text-3xl text-sage'>{project.hero2}</h1>
        <NavLink to={Paths.REGISTER}>
          <Button color="cta" className="px-4 ">
            Get Started
          </Button>
        </NavLink>
      </div>

      <div className=''>
        <div className='size-[500px] border border-major rounded-md'>a</div>
      </div>

    </div>
  )
}

export default Hero