// API 엔드포인트 설정
export const API_ENDPOINTS = {
  n8n: {
    baseUrl: 'https://funky-correct-mammal.ngrok-free.app',
    youtube: {
      webhooks: {
        test: 'webhook-test/7487481e-5d18-4c82-b0f3-796f3a580dbd',
        live: 'webhook/7487481e-5d18-4c82-b0f3-796f3a580dbd'
      }
    }
  }
} as const;

// 환경에 따른 웹훅 URL 생성 함수
export const getWebhookUrl = (service: 'youtube') => {
  const isProduction = process.env.NODE_ENV === 'production';
  const { baseUrl, youtube } = API_ENDPOINTS.n8n;
  
  switch (service) {
    case 'youtube':
      const path = isProduction ? youtube.webhooks.live : youtube.webhooks.test;
      return `${baseUrl}/${path}`;
    default:
      throw new Error('지원하지 않는 서비스입니다.');
  }
}; 