const isProduction = process.env.NODE_ENV === 'production';

export const API_CONFIG = {
  n8n: {
    baseUrl: process.env.NEXT_PUBLIC_N8N_SERVICE_URL,
    webhooks: {
      youtube: isProduction 
        ? process.env.N8N_YOUTUBE_WEBHOOK_LIVE_URL 
        : process.env.N8N_YOUTUBE_WEBHOOK_TEST_URL
    }
  },
  web: {
    baseUrl: isProduction 
      ? process.env.NEXT_PUBLIC_WEB_SERVICE_URL 
      : process.env.NEXT_PUBLIC_WEB_LOCAL_URL
  }
} as const;

// 웹훅 경로 상수
export const WEBHOOK_PATHS = {
  youtube: {
    test: process.env.N8N_YOUTUBE_WEBHOOK_TEST_PATH,
    live: process.env.N8N_YOUTUBE_WEBHOOK_LIVE_PATH
  }
} as const; 