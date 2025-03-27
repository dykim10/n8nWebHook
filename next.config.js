const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // 정적 파일 최적화 설정
    optimizeFonts: true,
    poweredByHeader: false,
    // bootstrap 소스맵 비활성화
    webpack: (config) => {
        config.optimization = {
            ...config.optimization,
            minimize: true,
        }
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src'),
            '@fonts': path.join(__dirname, 'fonts'),
            '@config': path.join(__dirname, 'config'),
        }
        return config
    }
}

module.exports = nextConfig 