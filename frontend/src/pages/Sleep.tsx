import AnimationWrapper from '@components/common/AnimationWrapper'
import SuccessAnimation from '@components/common/Success'
import ErrorAnimation from '@components/common/Error'
import React, { useState } from 'react'

function Sleep() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  console.log(isSuccess)

  return (
      <div>

        <h1 className='text-2xl font-bold'>Sleep</h1>

        <div className='flex justify-between mb-4 relative min-h-[190px] bg-purple-600'>

          {/* Success */}
          {/* <AnimationWrapper 
            color="green"
            active={isSuccess ?? null}
            message={""}
          > */}
            <SuccessAnimation isActive={isSuccess} bgcolor="rgb(147 51 234)" />
          {/* </AnimationWrapper> */}

          {/* Error */}
          {/* <AnimationWrapper 
            color="red"
            active={isError == false ?? null}
            message={""}
          >
          </AnimationWrapper> */}
            <ErrorAnimation isActive={isError} />

        </div>

          <div className='flex space-x-2 mt-12'>
            <button className='px-4 py-2 rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-white text-green-500' onClick={() => { setIsSuccess(prev => !prev) }}>Success</button>
            <button className='px-4 py-2 rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-500' onClick={(prev) => { setIsError(prev => !prev) }}>Error</button>

          </div>
    </div>
  )
}

export default Sleep