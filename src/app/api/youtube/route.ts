import { NextResponse } from 'next/server'

const WEBHOOK_URL = process.env.N8N_YOUTUBE_WEBHOOK_TEST_URL

export async function POST(request: Request) {
  try {
    // 1. 웹훅 URL 검증
    if (!WEBHOOK_URL) {
      console.error('Webhook URL is not defined')
      return NextResponse.json({
        success: false,
        message: '서버 설정 오류'
      }, { status: 500 })
    }

    // 2. 요청 데이터 검증
    const { url } = await request.json()
    if (!url) {
      return NextResponse.json({
        success: false,
        message: 'URL을 입력해주세요'
      }, { status: 400 })
    }

    // console.log("WEBHOOK_URL => " + WEBHOOK_URL);
    // console.log("url => " + url);
    // 3. n8n 웹훅으로 데이터 전송
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    // 4. 웹훅 응답 처리
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: 'n8n 웹훅 전송 실패'
      }, { status: response.status })
    }

    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'URL이 성공적으로 전송되었습니다'
    }, { status: 200 })

  } catch (error) {
    // 6. 에러 처리
    console.error('YouTube URL 전송 오류:', error)
    return NextResponse.json({
      success: false,
      message: 'URL 전송에 실패했습니다'
    }, { status: 500 })
  }
}