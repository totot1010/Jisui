'use client'

import { useState } from 'react'
import { PenSquare } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Textarea } from "@/components/shadcn/textarea"
import { Label } from "@/components/shadcn/label"

export type CreatePostDialogProps = {
  open: boolean
  onClose: () => void
}

export const CreatePostDialog = ({ open, onClose }: CreatePostDialogProps) => {
  const [dishName, setDishName] = useState('')
  const [price, setPrice] = useState('')
  const [details, setDetails] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = () => {
    console.log({ dishName, price, details, image })
    // TODO: 投稿処理
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>料理を投稿</DialogTitle>
          <DialogDescription>
            料理名、料金、説明、画像を入力してください
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dishName">料理名</Label>
            <Input
              id="dishName"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              required
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">説明</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">画像</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-black text-white hover:bg-gray-800 w-full" onClick={handleSubmit}>
            <PenSquare size={18} className="mr-2" />
            投稿する
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}