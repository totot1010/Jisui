'use client'

import { useState } from 'react'
import { PenSquare, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { createPost } from '../../actions/createPost'
import { toast } from '@/hooks/use-toast'
import { isApiError } from '@/api/types'

export type CreatePostDialogProps = {
  open: boolean
  onClose: () => void
}

export const CreatePostDialog = ({ open, onClose }: CreatePostDialogProps) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }
      const response = await createPost(formData)
      if (response && isApiError(response)) {
        toast({
          variant: "destructive",
          title: "予期せぬエラーが発生しました。",
          description: "コメントの投稿に失敗しました。",
        })
        return
      }
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>料理を投稿</DialogTitle>
          <DialogDescription>
            料理名、料金を入力してください
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">料理名</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">料金（円）</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">画像</Label>
            <Input
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-black text-white hover:bg-gray-800 w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <PenSquare size={18} className="mr-2" />
            )}
            {isLoading ? '投稿中...' : '投稿する'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}