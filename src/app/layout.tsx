// 서버 컴포넌트로 유지
import '@/styles/globals.css'
import { notoSansKr } from '@/config/fonts'
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata = {
  title: '웹훅 서비스',
  description: '다양한 웹훅 서비스를 이용해보세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <body suppressHydrationWarning={true}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
