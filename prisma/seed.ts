// import prisma from '../src/lib/prisma'
// // import bcrypt from 'bcrypt'
// import * as bcrypt from 'bcrypt'; // Fixed bcrypt import

// async function seed() {
//   const hashedPassword = await bcrypt.hash('admin123', 10)
//   await prisma.user.create({
//     data: { email: 'pasindusadanjana17@gmail.com', password: hashedPassword, role: 'admin' }
//   })
//   console.log('Admin user created')
// }

// seed()
//   .catch((e) => console.error(e))
//   .finally(() => prisma.$disconnect())


import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  try {
    const user = await prisma.user.create({
      data: {
        email: 'admin@yalasafari.com',
        password: hashedPassword,
        role: 'admin'
      }
    })
    console.log('Created admin user:', user)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })