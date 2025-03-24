/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '', // Leave empty for default (443 for HTTPS)
                pathname: '/**', // Allow all paths under this hostname
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '', // Leave empty for default (443 for HTTPS)
                pathname: '/**', // Allow all paths under this hostname
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
                port: '', // Leave empty for default (443 for HTTPS)
                pathname: '/**', // Allow all paths under this hostname
            },
        ],
        domains: ['res.cloudinary.com'],
    },
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
    },
    output: 'standalone',
    serverRuntimeConfig: {
        prisma: {
            connectionLimit: 5,
            pool: true
        }
    }
};

module.exports = nextConfig; 