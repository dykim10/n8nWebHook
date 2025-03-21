import axios from 'axios'
import { API_BASE_URL } from '@/constants/api'

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    // 요청 인터셉터 (예: 토큰 추가)
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error)
        return Promise.reject(error)
    }
)

const baseUrl = process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL

if (!baseUrl) {
    console.warn('Webhook base URL is not defined')
}

export const webhookApi = {
    post: async (endpoint: string, data: any) => {
        try {
            return await api.post(endpoint, data)
        } catch (error) {
            console.error(`Failed to post to ${endpoint}:`, error)
            throw error
        }
    },
    
    // GET, PUT, DELETE 등 필요한 메서드 추가
} 