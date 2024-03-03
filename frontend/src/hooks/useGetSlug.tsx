import type { INavigationItem, IUser } from "@models";
import { useAppSelector } from "@redux/hooks";

export const useGetSlug = (navItem: INavigationItem) => {
  const user = useAppSelector(state => state.user.data)

  if(user){
    if (navItem.requiresAuth) {
      return `/user/${user._id}/${navItem.slug}`;
    } 
  }

  return navItem.slug;

};