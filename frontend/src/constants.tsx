import type { INavigationItem } from "@models";
import { CrossIcon } from "@components/icons"

export const project = {
  name: "Self Regulator",
};

export const pages: INavigationItem[] = [
  { _id: "a797adfakjh76875asdjka87", name: "ABOUT", slug: "about", icon: <CrossIcon width={18} />, requiresAuth: false },
  { _id: "368c7813e77094c1c589bbb0", name: "HABITS", slug: "habits", icon: <CrossIcon width={18} />, requiresAuth: true },
  { _id: "e811754ef3a3ed7d620b8cf4", name: "TIMER", slug: "timer", icon: <CrossIcon width={18} />, requiresAuth: true },
  { _id: "35dcbb753572a64db0d12b49", name: "STATS", slug: "stats", icon: <CrossIcon width={18} />, requiresAuth: true },
  { _id: "fab685582e4644ec97138a96", name: "SIGN OUT", slug: "sign-out", icon: <CrossIcon width={18} />, requiresAuth: true },
];

export const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];