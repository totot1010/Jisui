-- CreateTable
CREATE TABLE "PostImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
