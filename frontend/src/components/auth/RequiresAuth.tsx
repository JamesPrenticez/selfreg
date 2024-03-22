import { type ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";
import { useGetUserDetailsQuery } from "@redux/services";
import Loading from "@components/common/Loading";
import { Paths } from "@models";

interface Props {
  children: ReactNode
}

function RequiresAuth({ children }: Props) {
  
  // let location = useLocation();


  // if(isLoading){
  //   return <Loading fullScreen={true} backgroundColor="#0F0" />
  // }

  // if (!user.isAuthenticated) {
  //   return <Navigate to={Paths.SIGN_IN} state={{ from: location }} replace />;
  // } else {
    return children;
  // }
}

export default RequiresAuth;