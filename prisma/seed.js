const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
})

async function main() {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash('admin123', 10)

        // Delete existing admin user if exists
        await prisma.user.deleteMany({
            where: {
                email: 'admin@yalasafari.com'
            }
        })

        // Create new admin user
        const admin = await prisma.user.create({
            data: {
                email: 'admin@yalasafari.com',
                password: hashedPassword,
                role: 'admin'
            }
        })

        console.log('Admin user created:', admin)
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }) 