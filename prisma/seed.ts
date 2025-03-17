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


import prisma from '../src/lib/prisma'; // Corrected path: prisma/ -> root -> src/lib/
import * as bcrypt from 'bcrypt'; // Namespace import for bcrypt

async function seed() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'pasindusadanjana17@gmail.com',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log('Admin user created');
}

seed()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from database');
  });