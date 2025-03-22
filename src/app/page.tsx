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
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">웹훅 서비스</h1>
        <p className="text-muted fs-5">
          다양한 웹훅 서비스를 이용해보세요
        </p>
      </div>

      <Row className="g-4">
        {features.map((feature) => (
          <Col key={feature.id} xs={12} md={6} lg={4}>
            <Card 
              className={`h-100 shadow-sm transition-all hover:shadow-md ${
                !feature.isAvailable ? 'opacity-60' : ''
              }`}
              style={{ 
                borderRadius: '12px',
                cursor: feature.isAvailable ? 'pointer' : 'default'
              }}
            >
              <Link 
                href={feature.isAvailable ? feature.path : '#'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="p-2 rounded-circle me-3"
                      style={{ 
                        backgroundColor: '#f8f9fa',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="h5 mb-0">{feature.title}</h3>
                  </div>
                  <p className="text-muted mb-0">
                    {feature.description}
                  </p>
                  {!feature.isAvailable && (
                    <div className="mt-2">
                      <span className="badge bg-secondary">개발 중</span>
                    </div>
                  )}
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
} 