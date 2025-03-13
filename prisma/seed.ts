import prisma from '../src/lib/prisma'
import bcrypt from 'bcrypt'

async function seed() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: { email: 'pasindusadanjana17@gmail.com', password: hashedPassword, role: 'admin' }
  })
  console.log('Admin user created')
}

seed()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
