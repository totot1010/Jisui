import { User } from "@/feature/auth/types"

export type Comment = {
  id: string
  text: string
  user: {
    id: User['id']
    username: User['username']
  }
}