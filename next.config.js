/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    compress: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
      return [
          {
              source: '/premium',
              destination: "https://buymeacoffee.com/flyght",
              permanent: false
          },
          {
              source: "/support",
              destination: "https://discord.com/invite/kxcUJ77SSF",
              permanent: false
          },
          {
              source: "/discord",
              destination: "https://discord.com/invite/kxcUJ77SSF",
              permanent: false
          },
          {
              source: "/invite",
              destination: "https://discord.com/api/oauth2/authorize?client_id=1173284134945308742&permissions=1099780418630&scope=applications.commands%20bot",
              permanent: false
          }
      ]
    }
}

module.exports = nextConfig
