/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    compress: true,
    eslint: {
        ignoreDuringBuilds: true,
    }
}

module.exports = nextConfig
