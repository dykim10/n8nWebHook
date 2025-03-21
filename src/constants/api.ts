export const API_BASE_URL = process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL || 'https://funky-correct-mammal.ngrok-free.app'

export const API_ENDPOINTS = {
    EMAIL: '/webhook-test/bc4c5cf7-4e5f-473b-be77-67a042c408a8',
    AI_AGENT: '/webhook-test/[ai-agent-id]',
} as const 