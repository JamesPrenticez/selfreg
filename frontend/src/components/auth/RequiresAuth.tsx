import { type ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";
import { useGetUserDetailsQuery } from "@redux/services";
import Loading from "@components/common/Loading";

interface Props {
  children: ReactNode
}

function RequiresAuth({ children }: Props) {
  const user = useAppSelector((state) => state.user);
  let location = useLocation();

  const { 
    isLoading,
  } = useGetUserDetailsQuery({ user_id: "123456" }, {
    skip: !user.isAuthenticated,
    pollingInterval: 900000, // refetch every 15mins
  })

  if(isLoading){
    return <Loading fullScreen={true} backgroundColor="#0F0" />
  }

  if (!user.isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  } else {
    return children;
  }
}

export default RequiresAuth;