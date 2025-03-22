import { YoutubeUrlRequest, YoutubeUrlResponse } from './youtube'

export const webhookApi = {
  post: async (endpoint: string, data: YoutubeUrlRequest): Promise<{ data: YoutubeUrlResponse }> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('API 요청 실패')
    }

    return response.json()
  },
} 