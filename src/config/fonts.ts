import localFont from 'next/font/local'
import { Noto_Sans_KR } from 'next/font/google'

// 로컬 폰트 설정
export const geistSans = localFont({
    src: '../app/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})

export const geistMono = localFont({
    src: '../app/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

// Noto Sans KR 추가
export const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-noto-sans-kr',
}) 