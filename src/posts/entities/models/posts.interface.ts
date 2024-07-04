import { User } from "src/user/entities/user.entity"

export interface IPost {
  id?: string
  title: string
  content?: string
  date: Date
  user: User
}
