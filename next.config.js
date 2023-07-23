/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.imagin.studio", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
