import React, { useState, useEffect } from 'react'
// import Todos from '@components/todos/Todos';
import api from '@api';
import { IUser } from '@models';
import User from '@components/user/User';
import WeekOfYear from '@components/todos/WeekOfYear';

function Exercise() {
  // const [active, setActive] = useState(false);

  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get<IUser>('user')
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <User />
      {/* <Todos /> */}
      <WeekOfYear />
    </div>
  )
}

export default Exercise