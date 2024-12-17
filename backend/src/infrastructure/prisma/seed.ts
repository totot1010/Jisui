import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  // 全てのテーブルのデータを削除
  console.log('delete all data');
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  console.log('delete all data done');

  console.log('create data');
  const hashedPassword = await bcrypt.hash("adminadmin1234", 10)
  const users = [
    {
      id: v4(),
      username: "admin",
      email: "admin@admin.co.jp",
      password: hashedPassword,
    },
    {
      id: v4(),
      username: "user",
      email: "user@user.com",
      password: hashedPassword,
    },
    {
      id: v4(),
      username: "test",
      email: "test@test.com",
      password: hashedPassword,
    }
  ];
  for (const user of users) {
    await prisma.user.create({
      data: user
    });

    // 投稿を3件作成
    const posts = [
      {
        id: v4(),
        title: "title1",
        userId: user.id,
        price: 1000,
      },
      {
        id: v4(),
        title: "title2",
        userId: user.id,
        price: 2000,
      },
      {
        id: v4(),
        title: "title3",
        userId: user.id,
        price: 3000,
      }
    ];
    await prisma.post.createMany({
      data: posts
    });
  }

  console.log('create data done');
}

console.log('start seed');
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
console.log('finish seed');
