import { User } from "../../../user/entities/user.entity"

export interface IPost {
  id?: string
  title: string
  content?: string
  date: Date
  user: User
}
