'use client'

import { Container } from 'react-bootstrap'
import { MemoList, MemoForm } from '@/components/memo'
import { useMemo } from '@/hooks/useMemo'

export default function VoiceMemoPage() {
    const { memos, loading, error, fetchMemos } = useMemo()

    return (
        <Container>
            <h1>음성 메모</h1>
            <MemoForm onSuccess={fetchMemos} />
            {loading ? (
                <p>로딩 중...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <MemoList memos={memos} />
            )}
        </Container>
    )
} 