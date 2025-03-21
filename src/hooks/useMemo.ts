import { useState, useCallback } from 'react'
import { memoService } from '@/services/memoService'
import { Memo } from '@/types/memo'

export const useMemo = () => {
    const [memos, setMemos] = useState<Memo[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchMemos = useCallback(async () => {
        try {
            setLoading(true)
            const data = await memoService.getMemos()
            setMemos(data)
        } catch (err) {
            setError('메모를 불러오는데 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }, [])

    // ... 기타 메소드

    return { memos, loading, error, fetchMemos }
} 