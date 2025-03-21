import { FC } from 'react'
import { Memo } from '@/types/memo'
import { MemoItem } from './MemoItem'

interface MemoListProps {
    memos: Memo[]
}

export const MemoList: FC<MemoListProps> = ({ memos }) => {
    return (
        <div className="space-y-4">
            {memos.map(memo => (
                <MemoItem key={memo.id} memo={memo} />
            ))}
        </div>
    )
} 