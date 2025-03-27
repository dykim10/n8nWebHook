// API 엔드포인트 설정
export const API_ENDPOINTS = {
  n8n: {
    baseUrl: 'https://funky-correct-mammal.ngrok-free.app',
    youtube: {
      webhooks: {
        test: 'webhook-test/7487481e-5d18-4c82-b0f3-796f3a580dbd',
        live: 'webhook/7487481e-5d18-4c82-b0f3-796f3a580dbd'
        // test: 'webhook-test/d5b8d0c5-575b-4769-82b1-9ad38159382d',
        // live: 'webhook/d5b8d0c5-575b-4769-82b1-9ad38159382d'
        //https://funky-correct-mammal.ngrok-free.app/webhook-test/7487481e-5d18-4c82-b0f3-796f3a580dbd
      }
    },
    youtube_mp3: {
      webhooks: {
        test: 'webhook-test/32598a47-a505-4b92-a374-8a84c918d5ae',
        live: 'webhook/32598a47-a505-4b92-a374-8a84c918d5ae'
        //https://funky-correct-mammal.ngrok-free.app/webhook-test/32598a47-a505-4b92-a374-8a84c918d5ae
        //https://www.youtube.com/watch?v=IdMK0kQVMAc
      }
    },
  }
} as const;


// 환경에 따른 웹훅 URL 생성 함수
export const getWebhookUrl = (service: 'youtube' | 'youtube_mp3') => {
  const isProduction = process.env.NODE_ENV === 'production';
  const { baseUrl, youtube, youtube_mp3 } = API_ENDPOINTS.n8n;
  let path;
  switch (service) {
    case 'youtube':
      path = isProduction ? youtube.webhooks.live : youtube.webhooks.test;
      return `${baseUrl}/${path}`;
    case 'youtube_mp3':
      path = isProduction ? youtube_mp3.webhooks.live : youtube_mp3.webhooks.test;
      return `${baseUrl}/${path}`;
    default:
      throw new Error('지원하지 않는 서비스입니다.');
  }
}; 