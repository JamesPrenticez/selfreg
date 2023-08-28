import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks'
import { fetchUser } from './userAPI'

const User = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.userStore.payload)

  useEffect(() => {
    void dispatch(fetchUser());
    console.log("fire - server request")
  }, [dispatch])

  return (
    <div>
      {data !== null &&
      <p>
        Hello, {data.username}
      </p>
      }
    </div>
  )
}

export default User