/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jaluwibowo.id",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_CDN_HOSTNAME,
        port: "",
        pathname: "/**"
      }
    ]
  }
}

module.exports = nextConfig
