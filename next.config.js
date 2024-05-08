/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sekolah.mu",
        port: "",
        pathname: "/**"
      }
    ]
  }
}

module.exports = nextConfig
