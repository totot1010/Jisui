'use client'

import { useState } from "react";
import Link from "next/link";
import { PenSquare, User } from "lucide-react";
import { CreatePostDialog } from "../CreatePostDialog";

export const AllPostSideNav = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <div className="w-16 flex flex-col items-center space-y-4 fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
        <div className="relative group">
          <button onClick={() => setDialogOpen(true)} className="bg-primary-500 text-black p-3 rounded-full hover:bg-primary-600 transition-colors duration-200 shadow-lg flex items-center justify-center w-12 h-12" data-testid="create-post-button">
            <PenSquare size={24} />
            <span className="sr-only">料理を投稿</span>
          </button>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
            料理を投稿
          </div>
        </div>
        <div className="relative group">
          <Link href="/profile" className="bg-secondary-200 p-3 rounded-full hover:bg-secondary-300 transition-colors duration-200 shadow-lg flex items-center justify-center w-12 h-12">
            <User size={24} />
            <span className="sr-only">マイページ</span>
          </Link>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
            マイページ
          </div>
        </div>
      </div>
      <CreatePostDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}