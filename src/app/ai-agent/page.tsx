'use client'

import { Container, Form, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import { BsRobot, BsSend, BsPersonFill } from 'react-icons/bs'
import { webhookApi } from '@/utils/api'
import { WEBHOOK_ENDPOINTS } from '@/config/endpoints'

export default function AIAgentPage() {
    const [message, setMessage] = useState('')
    const [conversation, setConversation] = useState<Array<{
        type: 'user' | 'ai',
        content: string
    }>>([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim()) return

        // 사용자 메시지 추가
        const userMessage = { type: 'user' as const, content: message }
        setConversation(prev => [...prev, userMessage])
        setMessage('')
        setLoading(true)

        // AI 응답 시뮬레이션 (실제로는 API 호출로 대체)
        setTimeout(() => {
            const aiMessage = { 
                type: 'ai' as const, 
                content: '안녕하세요! 무엇을 도와드릴까요?' 
            }
            setConversation(prev => [...prev, aiMessage])
            setLoading(false)
        }, 1000)
    }

    const handleAiRequest = async () => {
        try {
            const response = await webhookApi.post(WEBHOOK_ENDPOINTS.AI_AGENT, {
                // 데이터
            })
            // 응답 처리
        } catch (error) {
            // 에러 처리
        }
    }

    return (
        <Container className="py-16">
            <div className="text-center mb-10">
                <BsRobot className="text-5xl mb-4 text-success mx-auto" />
                <h1 className="text-4xl font-bold mb-4">AI 에이전트</h1>
                <p className="text-muted-foreground">
                    AI 에이전트와 대화하며 필요한 정보를 얻어보세요
                </p>
            </div>

            <Card className="max-w-3xl mx-auto shadow-sm">
                <Card.Body className="p-6">
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg" style={{minHeight: '400px', maxHeight: '600px', overflowY: 'auto'}}>
                        {conversation.map((msg, idx) => (
                            <div key={idx} className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}>
                                <div className={`inline-block max-w-[80%] p-3 rounded-lg
                                    ${msg.type === 'user' 
                                        ? 'bg-info text-white' 
                                        : 'bg-gray-100 text-gray-800'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        {msg.type === 'ai' 
                                            ? <BsRobot className="text-success" />
                                            : <BsPersonFill className="text-white" />}
                                        <span className="font-semibold">
                                            {msg.type === 'ai' ? 'AI 에이전트' : '사용자'}
                                        </span>
                                    </div>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="text-center text-muted-foreground">
                                AI가 응답하는 중...
                            </div>
                        )}
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div className="flex gap-2">
                            <Form.Control 
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="메시지를 입력하세요..."
                                className="p-3"
                                disabled={loading}
                            />
                            <Button 
                                variant="success" 
                                type="submit"
                                className="px-4"
                                disabled={loading || !message.trim()}
                            >
                                <BsSend />
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
} 