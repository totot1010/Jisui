import { User } from "@/feature/auth/types"

export type PostComment = {
  id: string
  postId: string
  userId: string
  username: string
  content: string
  createdAt: string
  updatedAt: string
}

export type Post = {
  postId: string
  title: string
  price: number
  userId: User['id']
  username: User['username']
  createdAt: Date
  updatedAt: Date
  likes: string[]
  comments: PostComment[]
}
