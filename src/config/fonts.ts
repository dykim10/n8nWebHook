import { Noto_Sans_KR } from 'next/font/google'

// Noto Sans KR 추가
export const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-noto-sans-kr',
}) 