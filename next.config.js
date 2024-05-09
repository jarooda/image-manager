/** @type {import('next').NextConfig} */
const hostnames = process.env.NEXT_CDN_HOSTNAMES.split(",").map((hostname) => {
  return {
    protocol: "https",
    hostname: hostname,
    port: "",
    pathname: "/**"
  }
})

const nextConfig = {
  images: {
    remotePatterns: hostnames
  }
}

module.exports = nextConfig
