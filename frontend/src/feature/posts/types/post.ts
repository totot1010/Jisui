import { User } from "@/feature/auth/types"

export type Post = {
  postId: string
  title: string
  price: number
  userId: User['id']
  username: User['username']
  createdAt: Date
  updatedAt: Date
  // likes: number
  // comments: Comment[]

}
