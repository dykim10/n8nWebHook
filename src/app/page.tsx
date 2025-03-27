'use client'

import { Container, Row, Col, Card } from 'react-bootstrap'
import { BsYoutube } from 'react-icons/bs'
import Link from 'next/link'

// 기능 목록 정의 (추후 확장 가능)
const features = [
  {
    id: 'youtube',
    title: 'YouTube URL 전송',
    description: 'YouTube URL을 n8n 웹훅으로 전송합니다.',
    icon: <BsYoutube className="text-danger" size={24} />,
    path: '/youtube',
    isAvailable: true
  },
  {
    id: 'youtube_mp3',
    title: 'YouTube MP3 추출',
    description: 'YouTube URL을 MP3로 추출하여 웹페이지로 제작하고자 합니다.',
    icon: <BsYoutube className="text-danger" size={24} />,
    path: '/youtube_mp3',
    isAvailable: true
  },
  // 새로운 기능 추가 예시
  // {
  //   id: 'new-feature',
  //   title: '새로운 기능',
  //   description: '설명...',
  //   icon: <IconComponent />,
  //   path: '/new-feature',
  //   isAvailable: false  // 개발 중인 기능은 false로 설정
  // },
]

export default function HomePage() {
  return (
    <Container className="py-5">
      <div 
        className="text-center mb-5"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: '3rem 1rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}
      >
        <h1 
          className="display-4 fw-bold mb-3"
          style={{
            background: 'linear-gradient(45deg, #343a40, #495057)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          웹훅 서비스
        </h1>
        <p className="text-muted fs-5 mb-0">
          다양한 웹훅 서비스를 이용해보세요
        </p>
      </div>

      <Row className="g-4">
        {features.map((feature) => (
          <Col key={feature.id} xs={12} md={6} lg={4}>
            <Card 
              className="h-100 border-0"
              style={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: feature.isAvailable ? 'pointer' : 'default',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderRadius: '1rem',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (feature.isAvailable) {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)'
                }
              }}
              onMouseLeave={(e) => {
                if (feature.isAvailable) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Link 
                href={feature.isAvailable ? feature.path : '#'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="h5 mb-0 fw-bold">{feature.title}</h3>
                  </div>
                  <p className="text-muted mb-0 fs-6">
                    {feature.description}
                  </p>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
} 