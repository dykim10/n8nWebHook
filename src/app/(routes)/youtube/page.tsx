'use client'

import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { BsYoutube, BsSend } from 'react-icons/bs'
import { toast } from 'react-hot-toast'

export default function YoutubePage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      toast.error('YouTube URL을 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

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
          <Card 
            className="shadow-sm" 
            style={{ 
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
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
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #ced4da',
                      backgroundColor: 'white',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075)'
                    }}
                  />
                </Form.Group>
                
                <div className="d-grid">
                  <Button
                    variant="danger"
                    type="submit"
                    size="lg"
                    disabled={loading}
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
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
        </Col>
      </Row>
    </Container>
  )
} 