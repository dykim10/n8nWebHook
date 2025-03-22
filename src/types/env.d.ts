declare namespace NodeJS {
  interface ProcessEnv {
    // Base URLs
    NEXT_PUBLIC_N8N_SERVICE_URL: string;
    NEXT_PUBLIC_WEB_LOCAL_URL: string;
    NEXT_PUBLIC_WEB_SERVICE_URL: string;

    // YouTube Webhook
    N8N_YOUTUBE_WEBHOOK_TEST_PATH: string;
    N8N_YOUTUBE_WEBHOOK_LIVE_PATH: string;
    N8N_YOUTUBE_WEBHOOK_TEST_URL: string;
    N8N_YOUTUBE_WEBHOOK_LIVE_URL: string;

    // Environment
    NODE_ENV: 'development' | 'production';
  }
} 