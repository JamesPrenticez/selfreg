import type { INavigationItem } from "@models";

export const project = {
  name: "Self Regulator",
};

export const pages: INavigationItem[] = [
  { _id: "40f5b6e4231624f8fadeb964", name: "HOME", url: "/", requiresAuth: false },
  { _id: "35dcbb753572a64db0d12b49", name: "ABOUT", url: "/about", requiresAuth: false },
  { _id: "213301b9d0511c504684705a", name: "LOGIN", url: "/login", requiresAuth: false },
  { _id: "368c7813e77094c1c589bbb0", name: "PROFILE", url: "/profile", requiresAuth: false },
  { _id: "c3091ead990d2eab392c23a6", name: "SETTINGS", url: "/settings", requiresAuth: false },
];

export const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];