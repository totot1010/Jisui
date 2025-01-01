'use client'

import { useState } from "react";
import Link from "next/link";
import { LogOut, PenSquare, User } from "lucide-react";

import { Button } from "@/components/shadcn/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shadcn/tooltip"

import { CreatePostDialog } from "../CreatePostDialog";
import { logout } from "@/feature/auth/actions/logout";

export const AllPostSideNav = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogout = async () => {
    console.log('ログアウト処理を実行')
    await logout()
  }
  return (
    <>
      <div className="w-16 flex flex-col items-center space-y-4 fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={() => setDialogOpen(true)}>
                  <PenSquare className="h-5 w-5" />
                  <span className="sr-only">料理を投稿</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>料理を投稿</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12" asChild>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">マイページ</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>マイページ</p>
            </TooltipContent>
          </Tooltip>

          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">ログアウト</span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>ログアウト</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ログアウトの確認</DialogTitle>
                <DialogDescription>
                  本当にログアウトしますか？
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  キャンセル
                </Button>
              </DialogClose>
                <Button variant="destructive" onClick={handleLogout}>
                  ログアウト
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TooltipProvider>
      </div>
      <CreatePostDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}