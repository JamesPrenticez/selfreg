import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUser } from '../../redux/thunk/userThunk'

const User = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.user.payload)

  useEffect(() => {
    void dispatch(getUser());
  }, [dispatch])

  return (
    <div>
      {data !== null &&
      <p>
        Hello, {data.firstName}
      </p>
      }
    </div>
  )
}

export default User