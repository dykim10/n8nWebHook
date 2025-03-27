import { NextResponse } from 'next/server'
import { getWebhookUrl } from '@/config/api'

export async function POST(request: Request) {
  try {
    const webhookUrl = getWebhookUrl('youtube_mp3');
    
    const { url } = await request.json()
    if (!url) {
      return NextResponse.json({
        success: false,
        message: 'URL을 입력해주세요'
      }, { status: 400 })
    }

    console.log('webhookUrl', webhookUrl)
    //console.log('request', request)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    // n8n 웹훅으로부터 받은 데이터
    const webhookData = await response.json()

    // 4. 웹훅 응답 처리
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: 'n8n 웹훅 전송 실패'
      }, { status: response.status })
    }

    //console.log('webhookData', webhookData);

    // 5. 성공 응답에 웹훅 데이터 포함
    return NextResponse.json({
      success: true,
      message: 'URL이 성공적으로 전송되었습니다',
      returnData : {
        // 여기서 웹페이지를 만들어서 전송하고자 합니다.
        htmlContent: webhookData[0].output.html,
        tags: webhookData[0].output.tags,
      }
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