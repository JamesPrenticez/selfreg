import { ITask } from "@models";

export const mockTasks: ITask[] = [
  {_id: "1", userId: "123456", task_name: "Sleep", slug:"/sleep", color:"#7dd3fc", bgcolor: "#3b82f6", icon: undefined, successIcon: "1f4a4", errorIcon: "1f440"},
  {_id: "2", userId: "123456", task_name: "Exercise", slug:"/exercise", color:"#8B0000", bgcolor: "#facc15", icon: undefined, successIcon: "1f3c6", errorIcon: "1f922"},
  {_id: "3", userId: "123456", task_name: "Meditation", slug:"/meditation", color:"#bbf7d0", bgcolor: "#22c55e", icon: undefined, successIcon: "1f607", errorIcon: "1f608"},
  {_id: "4", userId: "123456", task_name: "Business", slug:"/business", color:"#facc15", bgcolor: "#9333ea", icon: undefined, successIcon: "1f680", errorIcon: "1f4a9"},
]


