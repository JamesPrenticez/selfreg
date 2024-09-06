import { Paths, type INavigationItem } from "@models";
import { CrossIcon } from "@components/icons"

export const project = {
  name: "Self Regulator",
  hero1: "Unlock your potential!",
  hero2: "Record success, crush goals, and level up!"
};

export const navigationItemsForHomepage: INavigationItem[] = [
  { name: "pricing", path: Paths.PRICING, icon: <CrossIcon width={18} /> },
  { name: "resources", path: Paths.RESOURCES, icon: <CrossIcon width={18} /> },
  { name: "forum", path: Paths.FORUM, icon: <CrossIcon width={18} /> },
  { name: "shop", path: Paths.SHOP, icon: <CrossIcon width={18} /> },

];

export const navigationItemsForAuthenticedUsers: INavigationItem[] = [
  // { name: "habits", path: Paths.HABITS, icon: <CrossIcon width={18} /> },
  { name: "timer", path: Paths.TIMER, icon: <CrossIcon width={18} /> },
  { name: "setting", path: Paths.SETTINGS, icon: <CrossIcon width={18} /> },
];

export const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// "Level up"
// "Own your day!"
// "Hit milestones"
// "Count wins"
// "See results"
// "Reach higher"
// "Track victories"
// "Capture progress"
// "Record success"
// "Keep score"
// "Monitor growth"
// "Hit targets"
// "Stay ahead"
// "Chase success"
// "Reflect growth"
// "Clock achievements"
// "Show progress"
// "Break records"
// "Crush goals"