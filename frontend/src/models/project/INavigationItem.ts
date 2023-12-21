import type { ReactNode } from "react";

export interface INavigationItem {
  _id: string;
  name: string;
  url: string;
  requiresAuth: boolean;
  icon: ReactNode;
}