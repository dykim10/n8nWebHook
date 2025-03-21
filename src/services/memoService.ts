import { api } from '@/utils/api'
import { Memo } from '@/types/memo'

export const memoService = {
    getMemos: async (): Promise<Memo[]> => {
        const response = await api.get('/api/memos')
        return response.data
    },

    createMemo: async (content: string): Promise<Memo> => {
        const response = await api.post('/api/memos', { content })
        return response.data
    },
    
    // ... 기타 메소드
} 