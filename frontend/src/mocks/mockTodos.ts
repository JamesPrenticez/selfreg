import { type ITodo } from "@models"

export const mockTodos: ITodo[] = [
  {
    _id: "5f50c31e1c4ae0b63c4b4a94",
    user_id: "123456",
    title: "Sleep",
    slug:"/sleep",
    description: "Lights out at 10pm",
    color:"#7dd3fc",
    bgcolor: "#3b82f6",
    icon: undefined,
    successIcon: "1f4a4",
    errorIcon: "1f440",
    created_at: "2023-09-08T12:34:56Z",
    days: undefined
  },
  {
    _id: "d746d674af5d9ca20be219e0",
    user_id: "123456",
    title: "Exercise",
    slug:"/exercise",
    description: "Daily exercise for 30 minutes",
    // color:"#facc15",
    color:"#f87171", //
    // bgcolor: "#8B0000",
    // bgcolor: "#991b1b",
    bgcolor: "#ef4444",
    icon: undefined,
    successIcon: "1f3c6",
    errorIcon: "1f922",
    created_at: "2023-09-08T12:34:56Z",
    days: undefined
  },
  {
    _id: "29f8424c32b86011633c0a6e",
    user_id: "123456",
    title: "Meditation",
    slug:"/meditation",
    description: "Daily meditation for 10 minutes",
    color:"#bbf7d0",
    bgcolor: "#22c55e",
    icon: undefined,
    successIcon: "1f607",
    errorIcon: "1f608",
    created_at: "2023-09-08T12:34:56Z",
    days: undefined
  },
  {
    _id: "38f8427c32ba50112633d0f9b",
    user_id: "123456",
    title: "Business",
    slug:"/business",
    description: "Work on making money for 1 hour",
    color:"#c084fc",
    bgcolor: "#9333ea",
    icon: undefined,
    successIcon: "1f680",
    errorIcon: "1f4a9",
    created_at: "2023-09-08T12:34:56Z",
    days: undefined
  }
]
