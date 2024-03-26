import { Paths, type INavigationItem } from "@models";
import { CrossIcon } from "@components/icons"

export const project = {
  name: "Self Regulator",
};

export const navigationItemsForHomepage: INavigationItem[] = [
  { name: "pricing", path: Paths.PRICING, icon: <CrossIcon width={18} /> },
  { name: "resources", path: Paths.RESOURCES, icon: <CrossIcon width={18} /> },
  { name: "forum", path: Paths.FORUM, icon: <CrossIcon width={18} /> },
  { name: "shop", path: Paths.SHOP, icon: <CrossIcon width={18} /> },
];

export const navigationItemsForAuthenticedUsers: INavigationItem[] = [
  { name: "habits", path: Paths.HABITS, icon: <CrossIcon width={18} /> },
];

export const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];