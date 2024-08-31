import React from 'react'
import { Button } from '@components/ui'
import { useLogoutMutation } from '@redux/services';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@models';

const LogoutButton = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout().unwrap();
      navigate(Paths.LOGIN);
      console.log('Logout successful. Redirecting...');
    } catch (error: any) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Button
      color="minor"
      className="px-4"
      onClick={handleLogout}
    >
    Logout
  </Button>
  )
}

export default LogoutButton;