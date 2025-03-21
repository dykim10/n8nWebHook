'use client'

import { Container } from 'react-bootstrap'
import { BsMicFill } from 'react-icons/bs'

export default function VoiceMemoPage() {
    return (
        <Container className="py-16">
            <div className="text-center">
                <BsMicFill className="text-5xl mb-4 text-gray-400" />
                <h1 className="text-4xl font-bold mb-4">
                    음성 메모 기능 준비중
                </h1>
                <p className="text-xl text-muted-foreground">
                    해당 기능은 현재 개발 중입니다.
                </p>
            </div>
        </Container>
    )
} 