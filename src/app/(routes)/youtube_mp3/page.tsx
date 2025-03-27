'use client'

import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { BsYoutube, BsSend } from 'react-icons/bs'
import { toast } from 'react-hot-toast'

interface ResponseData {
  success: boolean;
  message: string;
  returnData?: {
    htmlContent?: string;
    tags?: string[];
  };
}

export default function YoutubePage() {
  //const [url, setUrl] = useState('https://www.youtube.com/watch?v=IdMK0kQVMAc')
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=zMSCLeOJxro')
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
      const response = await fetch('/api/youtube_mp3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()
      // tags 문자열을 배열로 변환
      const tagsArray = data.returnData.tags?.split(',').map((tag: string) => tag.trim()) || []

      console.log('data', data);
      console.log('data.output => ', data.returnData);
      console.log('data.output => ', data.returnData.htmlContent);

      // 2. response 상태 업데이트
      setResponse({
        success: data.success,           // API 성공 여부
        message: data.message,           // API 메시지
        returnData: {                    // returnData 객체
          htmlContent: data.returnData.htmlContent,  // HTML 내용
          tags: tagsArray                 // 태그 배열
        }
      })

      if (!response.ok) {
        throw new Error(data.message || 'URL 전송에 실패했습니다')
      }

      //데이터를 받은 후에, 

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
            <p className="text-muted fs-6 mb-5">
              YouTube URL을 입력하면, <span className="fw-bold text-primary text-decoration-underline">AI</span> 활용, 
              YouTube 영상 내의 음성을 추출하여<br></br>
              그 내용을 html과 tags로 구분하여 <span className="text-decoration-underline">미리보기</span>를 제공합니다. 
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
                    size="sm"
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

                  {response.returnData && response.returnData.tags && (
                    <Card className="mt-3">
                      <Card.Header className="bg-info text-white">
                        <h5 className="mb-0">태그</h5>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-flex flex-wrap gap-2">
                          {response.returnData.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="badge bg-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  )}

                  {response.returnData && response.returnData.htmlContent && (
                    <Card className="mt-3">
                      <Card.Header className="bg-success text-white">
                        <h5 className="mb-0">웹페이지 미리보기</h5>
                      </Card.Header>
                      <Card.Body>
                        <div 
                          className="border rounded p-3"
                          style={{ 
                            maxHeight: '500px', 
                            overflowY: 'auto',
                            backgroundColor: '#f8f9fa'
                          }}
                          dangerouslySetInnerHTML={{ __html: response.returnData.htmlContent }}
                        />
                      </Card.Body>
                    </Card>
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