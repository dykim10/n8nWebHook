'use client'

import { Container, Form, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import { BsEnvelopeFill, BsSend, BsPaperclip } from 'react-icons/bs'
import { webhookApi } from '@/utils/api'
import { API_ENDPOINTS } from '@/constants/api'

export default function EmailPage() {
    const [email, setEmail] = useState({
        to: '',
        subject: '',
        content: '',
        attachments: [] as File[]
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await webhookApi.post(
                API_ENDPOINTS.EMAIL,
                {
                    emailData: {
                        to: email.to,
                        subject: email.subject,
                        content: email.content
                    },
                    timestamp: new Date().toISOString(),
                    source: 'portfolio-email-service'
                }
            )

            if (response.status === 200) {
                alert('이메일이 n8n 워크플로우로 전송되었습니다.')
                setEmail({
                    to: '',
                    subject: '',
                    content: '',
                    attachments: []
                })
            }
        } catch (error) {
            console.error('n8n webhook 전송 실패:', error)
            alert('이메일 전송에 실패했습니다. n8n 워크플로우를 확인해주세요.')
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setEmail(prev => ({
                ...prev,
                attachments: [...prev.attachments, ...Array.from(e.target.files || [])]
            }))
        }
    }

    const removeAttachment = (index: number) => {
        setEmail(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }))
    }

    return (
        <Container className="py-16">
            <div className="text-center mb-10">
                <BsEnvelopeFill className="text-5xl mb-4 text-info mx-auto" />
                <h1 className="text-4xl font-bold mb-4">이메일 보내기</h1>
                <p className="text-muted-foreground">
                    간편하게 이메일을 작성하고 발송하세요
                </p>
            </div>

            <Card className="max-w-2xl mx-auto shadow-sm">
                <Card.Body className="p-6">
                    <Form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="form-section">
                                <div className="grid grid-cols-12 gap-4 items-start">
                                    <div className="col-span-3">
                                        <Form.Label className="form-label">
                                            받는 사람
                                        </Form.Label>
                                    </div>
                                    <div className="col-span-9">
                                        <Form.Control 
                                            type="email" 
                                            value={email.to}
                                            onChange={e => setEmail({...email, to: e.target.value})}
                                            placeholder="받는 사람의 이메일 주소를 입력하세요"
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            <div className="form-section">
                                <div className="grid grid-cols-12 gap-4 items-start">
                                    <div className="col-span-3">
                                        <Form.Label className="form-label">
                                            제목
                                        </Form.Label>
                                    </div>
                                    <div className="col-span-9">
                                        <Form.Control 
                                            type="text"
                                            value={email.subject}
                                            onChange={e => setEmail({...email, subject: e.target.value})}
                                            placeholder="이메일 제목을 입력하세요"
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            <div className="form-section">
                                <div className="grid grid-cols-12 gap-4 items-start">
                                    <div className="col-span-3">
                                        <Form.Label className="form-label">
                                            내용
                                        </Form.Label>
                                    </div>
                                    <div className="col-span-9">
                                        <div className="relative">
                                            <Form.Control 
                                                as="textarea" 
                                                rows={12}
                                                value={email.content}
                                                onChange={e => setEmail({...email, content: e.target.value})}
                                                placeholder="이메일 내용을 입력하세요"
                                                className="form-textarea"
                                            />
                                            <div className="absolute bottom-3 right-3 flex gap-2">
                                                <Form.Label 
                                                    className="mb-0 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                    title="파일 첨부"
                                                >
                                                    <BsPaperclip className="text-gray-500" />
                                                    <Form.Control 
                                                        type="file" 
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                        multiple
                                                    />
                                                </Form.Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {email.attachments.length > 0 && (
                                <>
                                    <hr className="border-gray-200" />
                                    <div className="form-section">
                                        <div className="grid grid-cols-12 gap-4 items-start">
                                            <div className="col-span-3">
                                                <p className="form-label">첨부 파일</p>
                                            </div>
                                            <div className="col-span-9">
                                                <div className="space-y-2">
                                                    {email.attachments.map((file, index) => (
                                                        <div 
                                                            key={index}
                                                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                                        >
                                                            <span className="text-sm text-gray-600">{file.name}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeAttachment(index)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <hr className="border-gray-200" />

                            <div className="form-section">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-3" />
                                    <div className="col-span-9">
                                        <Button 
                                            variant="primary"
                                            type="submit"
                                            className="w-full px-8 py-3 text-white font-semibold text-lg shadow-lg hover:shadow-xl 
                                                      transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600"
                                            disabled={loading}
                                        >
                                            <BsSend className="inline-block mr-2 mb-1" />
                                            {loading ? (
                                                <span className="flex items-center justify-center">
                                                    <span className="animate-pulse">전송 중...</span>
                                                </span>
                                            ) : (
                                                '이메일 보내기'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}