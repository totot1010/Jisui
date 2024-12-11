'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Edit, ChevronLeft, Heart, MessageCircle, PenSquare } from 'lucide-react'
import { CreatePostDialog } from '@/feature/posts/components/CreatePostDialog'
import { useState } from 'react'

// ダミーデータ
const user = {
  name: "料理好きな太郎",
  avatar: "/placeholder.svg?height=100&width=100",
  cookingToday: 2,
  cookingThisWeek: 8,
}

const generateYearlyCookingData = () => {
  const today = new Date()
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
  const data = []

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    data.push({
      date: new Date(d),
      count: Math.floor(Math.random() * 4) // 0-3のランダムな回数
    })
  }

  return data
}

const cookingHistory: { date: Date, count: number }[] = generateYearlyCookingData()

const userPosts = [
  {
    id: 1,
    dishName: "和風パスタ",
    imageUrl: "/placeholder.svg?height=300&width=300",
    details: "今日の晩ごはん！和風パスタを作ってみました。しょうゆベースで、きのこと海苔を使っています。",
    price: 800,
    likes: 15,
    comments: [
      { id: 1, username: "食いしん坊花子", text: "美味しそう！レシピ教えてください！" },
      { id: 2, username: "グルメな次郎", text: "素敵な盛り付けですね！" }
    ]
  },
  {
    id: 2,
    dishName: "チーズケーキ",
    imageUrl: "/placeholder.svg?height=300&width=300",
    details: "手作りチーズケーキ完成！クリームチーズとレモンの風味がポイントです。",
    price: 1200,
    likes: 23,
    comments: [
      { id: 3, username: "甘党サブロー", text: "すごく美味しそう！食べたい！" }
    ]
  },
]

const CookingHeatMap = ({ history }: { history: { date: Date, count: number }[] }) => {
  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-100'
    if (count === 1) return 'bg-orange-200'
    if (count === 2) return 'bg-orange-300'
    return 'bg-orange-400'
  }

  const weeks = []
  for (let i = 0; i < 53; i++) {
    weeks.push(
      <div key={i} className="grid grid-rows-7 gap-1">
        {[0, 1, 2, 3, 4, 5, 6].map(day => {
          const index = i * 7 + day
          const data = index < history.length ? history[index] : null
          return (
            <div
              key={day}
              className={`w-3 h-3 rounded-sm ${data ? getColor(data.count) : 'bg-gray-100'}`}
              title={data ? `${data.date.toISOString().split('T')[0]}: ${data.count}回` : ''}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex space-x-1 overflow-x-auto pb-4">
      {weeks}
    </div>
  )
}

export default function Profile() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto p-4">
        <Link href="/home" className="flex items-center text-primary-600 mb-4">
          <ChevronLeft size={20} />
          <span>みんなの投稿</span>
        </Link>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <div className="flex items-center">
              <Image
                src={user.avatar}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">@{user.name.toLowerCase().replace(/\s/g, '')}</p>
              </div>
            </div>
            <Link
              href="/profile/edit"
              className="absolute top-0 right-0 bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center text-sm"
            >
              <Edit size={16} className="mr-1" />
              編集
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">本日の自炊回数</h2>
              <p className="text-3xl font-bold text-primary-600">{user.cookingToday}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">今週の自炊回数</h2>
              <p className="text-3xl font-bold text-primary-600">{user.cookingThisWeek}</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">年間自炊活動</h2>
            <CookingHeatMap history={cookingHistory} />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">投稿一覧</h2>
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center"
          >
            <PenSquare size={18} className="mr-2" />
            投稿する
          </button>
        </div>
        <div className="space-y-8">
          {userPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-200 rounded-full mr-4 flex items-center justify-center text-primary-600 font-bold text-xl">
                    {user.name[0]}
                  </div>
                  <div>
                    <span className="font-semibold text-lg block">{user.name}</span>
                    <span className="text-sm text-secondary-500">{post.dishName}</span>
                  </div>
                </div>
                <div className="mb-4 relative aspect-video">
                  <Image src={post.imageUrl} alt={post.dishName} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold mb-2 text-primary-700">{post.dishName}</h2>
                  <p className="text-secondary-600 mb-2">{post.details}</p>
                  <p className="text-lg font-bold text-primary-500 flex items-center">
                    ¥{post.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center mb-4 space-x-4">
                  <button className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-200">
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreatePostDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
