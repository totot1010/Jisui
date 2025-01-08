'use client'

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card"
import { UserEditForm } from '../UserEditForm/UserEditForm'

type UserEditProps = 	{
	userId: string
}

export const UserEdit = ({ userId }: UserEditProps) => {
	return (
		<div className="container mx-auto p-4">
			<Link href={`/profile/${userId}`} className="flex items-center text-primary-600 mb-4">
				<ChevronLeft className="mr-2 h-4 w-4" />
				マイページ
			</Link>
			<Card>
				<CardHeader>
					<CardTitle>プロフィール編集</CardTitle>
					<CardDescription>あなたのプロフィール情報を更新します。</CardDescription>
				</CardHeader>
				<CardContent>
					<UserEditForm userId={userId} />
				</CardContent>
			</Card>
		</div>
	)
}
