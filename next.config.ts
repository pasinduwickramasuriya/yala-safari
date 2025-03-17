// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '', // Leave empty for default (443 for HTTPS)
//         pathname: '/**', // Allow all paths under this hostname
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  },
};

export default nextConfig;