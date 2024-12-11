'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, MessageCircle, PenSquare, User, DollarSign } from 'lucide-react'
import { CreatePostDialog } from '@/feature/posts/components/CreatePostDialog'

type Post = {
  id: number
  username: string
  dishName: string
  price: number
  imageUrl: string
  details: string
  likes: number
  comments: Comment[]
}

type Comment = {
  id: number
  username: string
  text: string
}

const dummyPosts: Post[] = [
  {
    id: 1,
    username: "料理好きな太郎",
    dishName: "和風パスタ",
    price: 800,
    imageUrl: "/placeholder.svg?height=300&width=300",
    details: "今日の晩ごはん！和風パスタを作ってみました。しょうゆベースで、きのこと海苔を使っています。",
    likes: 15,
    comments: [
      { id: 1, username: "食いしん坊花子", text: "美味しそう！レシピ教えてください！" },
      { id: 2, username: "グルメな次郎", text: "素敵な盛り付けですね！" }
    ]
  },
  {
    id: 2,
    username: "スイーツマニア子",
    dishName: "チーズケーキ",
    price: 1200,
    imageUrl: "/placeholder.svg?height=300&width=300",
    details: "手作りチーズケーキ完成！クリームチーズとレモンの風味がポイントです。",
    likes: 23,
    comments: [
      { id: 3, username: "甘党サブロー", text: "すごく美味しそう！食べたい！" }
    ]
  }
]

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(dummyPosts)

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleComment = (postId: number, comment: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: Date.now(), username: "現在のユーザー", text: comment }] }
        : post
    ))
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-16 flex flex-col items-center space-y-4 fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="relative group">
              <button onClick={() => setDialogOpen(true)} className="bg-primary-500 text-black p-3 rounded-full hover:bg-primary-600 transition-colors duration-200 shadow-lg flex items-center justify-center w-12 h-12">
                <PenSquare size={24} />
              </button>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                料理を投稿
              </div>
            </div>
            <div className="relative group">
              <Link href="/profile" className="bg-secondary-200 p-3 rounded-full hover:bg-secondary-300 transition-colors duration-200 shadow-lg flex items-center justify-center w-12 h-12">
                <User size={24} />
              </Link>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                マイページ
              </div>
            </div>
          </div>
          <div className="flex-1 ml-20">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-primary-600">みんなの投稿</h1>
            </header>
            <main className="space-y-8">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary-200 rounded-full mr-4 flex items-center justify-center text-primary-600 font-bold text-xl">
                        {post.username[0]}
                      </div>
                      <div>
                        <Link href={"/profile"}>
                          <span className="font-semibold text-lg block">{post.username}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mb-4 relative aspect-video">
                      <Image src={post.imageUrl} alt={post.dishName} layout="fill" objectFit="cover" className="rounded-lg" />
                    </div>
                    <div className="mb-4">
                      <h2 className="text-2xl font-semibold mb-2 text-primary-700">{post.dishName}</h2>
                      <p className="text-secondary-600 mb-2">{post.details}</p>
                      <p className="text-lg font-bold text-primary-500 flex items-center">
                        <DollarSign size={20} className="mr-1" />
                        {post.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center mb-4 space-x-4">
                      <button onClick={() => handleLike(post.id)} className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-200">
                        <Heart size={20} className="mr-1" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-200">
                        <MessageCircle size={20} className="mr-1" />
                        <span>{post.comments.length}</span>
                      </button>
                    </div>
                    <div className="mb-4 space-y-2">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="bg-secondary-100 rounded-lg p-3">
                          <span className="font-semibold mr-2 text-primary-600">{comment.username}</span>
                          <span className="text-secondary-700">{comment.text}</span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const input = e.currentTarget.elements.namedItem('comment') as HTMLInputElement
                      if (input.value.trim()) {
                        handleComment(post.id, input.value.trim())
                        input.value = ''
                      }
                    }} className="flex">
                      <input
                        type="text"
                        name="comment"
                        placeholder="コメントを追加..."
                        className="flex-grow border border-secondary-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button type="submit" className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800 transition-colors duration-200">
                        投稿
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </main>
          </div>
        </div>
      </div>
      <CreatePostDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
