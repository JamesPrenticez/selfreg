import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUser } from '../../redux/thunk/userThunk'
import { capitalizeWords } from '@utils';

const User = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser({ _id: '123456' }));
  }, [dispatch]);

  return (
    <div>
      {user.isLoading ? (
        <p>Loading...</p>
      ) : user.payload ? (
        <p>
          Hello, {capitalizeWords(user.payload.firstName)}
        </p>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default User;