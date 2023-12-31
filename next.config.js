/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        ACCEPTABLE_FILE_EXTENSION: process.env.ACCEPTABLE_FILE_EXTENSION,
        ACCEPTABLE_FILE_SIZE: process.env.ACCEPTABLE_FILE_SIZE
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // output: 'export'
}

module.exports = nextConfig
