import type { ReactNode } from "react";

export interface INavigationItem {
  _id: string;
  name: string;
  slug: string;
  requiresAuth: boolean;
  icon: ReactNode;
}