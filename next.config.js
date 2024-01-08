/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'files.edgestore.dev',
            port: '',
            pathname: '/imtj18ybawcyq4t2/publicImages/_public/**',
        }, ],
    },
}

module.exports = nextConfig
