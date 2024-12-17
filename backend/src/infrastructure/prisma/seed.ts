import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  // ユーザーを新規作成
  console.log('create user');
  const hashedPassword = await bcrypt.hash("adminadmin1234", 10)

  await prisma.user.create({
    data: {
      id: v4(),
      username: "admin",
      email: "admin@admin.co.jp",
      password: hashedPassword,
    },
  });
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
