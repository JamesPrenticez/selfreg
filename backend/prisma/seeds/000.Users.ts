import { User } from '@prisma/client'

export const users: User[] = [
  {
    id: "cltby46be0000hiwp27vmrxwm",
    email: "prenticez@hotmail.co.nz",
    passwordHash: "d16608df4aa5a8d63dae3c782526ec2a:e6c1945d0c67d80328fe41b5d15f53033aebe759d383661be0e10addbc3831de4b570e88e161e7d6e2a137eb8103807b8d1be86cff781b71327c4940d372b431",
    firstName: "james",
    lastName: "prentice",
    phone: "027 123 456",
    profilePicture: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    locale: "en-gb",
    country: "New Zealand",
    permissions: "[ADMIN]",
    subscription: "FREE",
    dateCreated: new Date(),
    lastModified: new Date(),
  }
]



