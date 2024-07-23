import { Post } from "../../../posts/entities/posts.entity"

export interface IUser {
  id?: number
  username: string
  email: string
  password: string
  role: string
  posts?: Post[]
}
