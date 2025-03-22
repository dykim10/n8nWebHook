const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname), // 👈 추가
            '@fonts': path.join(__dirname, 'fonts'),
            '@config': path.join(__dirname, 'config'),
        }
        return config
    }
}

module.exports = nextConfig 