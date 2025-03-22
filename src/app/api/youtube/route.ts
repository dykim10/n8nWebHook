import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    
    // n8n 웹훅으로 데이터 전송
    const response = await fetch(process.env.N8N_YOUTUBE_WEBHOOK_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error('n8n 웹훅 전송 실패')
    }

    return NextResponse.json({ success: true, message: 'URL이 성공적으로 전송되었습니다' })
  } catch (error) {
    console.error('YouTube URL 전송 오류:', error)
    return NextResponse.json(
      { success: false, message: 'URL 전송에 실패했습니다' },
      { status: 500 }
    )
  }
}