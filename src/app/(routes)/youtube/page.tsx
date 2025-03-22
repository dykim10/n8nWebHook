'use client'

import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { BsYoutube, BsSend } from 'react-icons/bs'
import { toast } from 'react-hot-toast'

interface ResponseData {
  success: boolean;
  message: string;
  data?: {
    title?: string;
    thumbnailUrl?: string;
    duration?: string;
    // 추후 추가될 수 있는 데이터들
  };
}

export default function YoutubePage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ResponseData | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      toast.error('YouTube URL을 입력해주세요')
      return
    }

    setLoading(true)
    setResponse(null) // 새로운 요청 시 이전 응답 초기화

    try {
      const response = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()
      setResponse(data)

      if (!response.ok) {
        throw new Error(data.message || 'URL 전송에 실패했습니다')
      }

      toast.success(data.message)
      setUrl('')
    } catch (error) {
      toast.error('URL 전송에 실패했습니다')
      console.error('URL 전송 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid className="py-5 bg-white">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={7}>
          {/* 헤더 섹션 */}
          <div className="text-center mb-5">
            <div className="d-flex justify-content-center mb-3">
              <div style={{ 
                backgroundColor: '#ffebee', 
                borderRadius: '50%', 
                width: '80px', 
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <BsYoutube className="text-danger" style={{ fontSize: '40px' }} />
              </div>
            </div>
            <h1 className="display-5 fw-bold mb-3">YouTube URL 전송</h1>
            <p className="text-muted fs-5 mb-5">
              YouTube URL을 입력하여 전송하세요
            </p>
          </div>
          
          {/* URL 입력 카드 */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>YouTube URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                    disabled={loading}
                  />
                </Form.Group>
                
                <div className="d-grid">
                  <Button
                    variant="danger"
                    type="submit"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        전송 중...
                      </>
                    ) : (
                      <>
                        <BsSend className="me-2" /> URL 전송
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* 응답 결과 영역 - 항상 표시 */}
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-3">처리 결과</h4>
              {response ? (
                <>
                  <Alert variant={response.success ? 'success' : 'danger'}>
                    {response.message}
                  </Alert>
                  
                  {response.success && response.data && (
                    <div className="mt-3">
                      {response.data.thumbnailUrl && (
                        <div className="mb-3">
                          <img 
                            src={response.data.thumbnailUrl} 
                            alt="Video thumbnail" 
                            className="img-fluid rounded"
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                      )}
                      {response.data.title && (
                        <p className="mb-2">
                          <strong>제목:</strong> {response.data.title}
                        </p>
                      )}
                      {response.data.duration && (
                        <p className="mb-0">
                          <strong>재생 시간:</strong> {response.data.duration}
                        </p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-muted py-4">
                  <p className="mb-0">URL을 전송하면 결과가 여기에 표시됩니다</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
} 