/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/industries/finance-legal', destination: '/sectors/finance-legal', permanent: true },
      { source: '/industries/healthcare', destination: '/sectors/healthcare', permanent: true },
      { source: '/industries/ecommerce', destination: '/sectors/ecommerce', permanent: true },
      { source: '/industries/logistics', destination: '/sectors/logistics', permanent: true },
      { source: '/industries/:slug', destination: '/sectors/:slug', permanent: true },
    ];
  },
}

export default nextConfig
