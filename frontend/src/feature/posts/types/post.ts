import { User } from "@/feature/auth/types"

export type Post = {
  id: string
  title: string
  price: number
  likes: number
  comments: Comment[]
  user: {
    id: User['id']
    username: User['username']
  }
}
