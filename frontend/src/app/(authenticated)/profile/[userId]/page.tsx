import { ProfileCard } from '@/feature/users/components/ProfileCard'

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;

  return (
    <div className="container mx-auto p-4">
      <ProfileCard userId={userId} />
    </div>
    // TODO: ユーザー投稿一覧を表示する
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-2xl font-bold">投稿一覧</h2>
    //     <button
    //       onClick={() => setDialogOpen(true)}
    //       className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center"
    //     >
    //       <PenSquare size={18} className="mr-2" />
    //       投稿する
    //     </button>
    //   </div>
    //   <div className="space-y-8">
    //     {userPosts.map(post => (
    //       <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
    //         <div className="p-6">
    //           <div className="flex items-center mb-4">
    //             <div className="w-12 h-12 bg-primary-200 rounded-full mr-4 flex items-center justify-center text-primary-600 font-bold text-xl">
    //               {user.name[0]}
    //             </div>
    //             <div>
    //               <span className="font-semibold text-lg block">{user.name}</span>
    //               <span className="text-sm text-secondary-500">{post.dishName}</span>
    //             </div>
    //           </div>
    //           <div className="mb-4 relative aspect-video">
    //             <Image src={post.imageUrl} alt={post.dishName} layout="fill" objectFit="cover" className="rounded-lg" />
    //           </div>
    //           <div className="mb-4">
    //             <h2 className="text-2xl font-semibold mb-2 text-primary-700">{post.dishName}</h2>
    //             <p className="text-secondary-600 mb-2">{post.details}</p>
    //             <p className="text-lg font-bold text-primary-500 flex items-center">
    //               ¥{post.price.toLocaleString()}
    //             </p>
    //           </div>
    //           <div className="flex items-center mb-4 space-x-4">
    //             <button className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-200">
    //               <Heart size={20} className="mr-1" />
    //               <span>{post.likes}</span>
    //             </button>
    //             <button className="flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-200">
    //               <MessageCircle size={20} className="mr-1" />
    //               <span>{post.comments.length}</span>
    //             </button>
    //           </div>
    //           <div className="mb-4 space-y-2">
    //             {post.comments.map(comment => (
    //               <div key={comment.id} className="bg-secondary-100 rounded-lg p-3">
    //                 <span className="font-semibold mr-2 text-primary-600">{comment.username}</span>
    //                 <span className="text-secondary-700">{comment.text}</span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // <CreatePostDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
  )
}
