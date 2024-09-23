import { User } from "../../../user/entities/user.entity"

export interface IPost {
  id?: string
  title: string
  content?: string
  image?: string
  date: Date
  user: User
}
