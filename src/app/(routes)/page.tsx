'use client'

import { useRouter } from 'next/navigation'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { BsMicFill, BsEnvelopeFill, BsRobot } from 'react-icons/bs'

export default function Home() {
    const router = useRouter()
    
    const handleNavigate = (path: string) => {
        router.push(`/${path}`)
    }

    const services = [
        {
            title: 'Youtube 영상 요약',
            description: 'Youtube 영상을 쉽게 요약하세요',
            icon: <BsMicFill className="text-4xl mb-4 text-gray-400" />,
            path: 'youtube-summary',
            disabled: true,
            badge: '',
        },

    ]

    return (
        <Container className="py-16">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                    AI 도우미 서비스
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    인공지능 기술을 활용한 다양한 서비스를 경험해보세요
                </p>
            </div>

            <Row className="g-4">
                {services.map((service, index) => (
                    <Col key={index} md={4}>
                        <Card 
                            onClick={() => !service.disabled && handleNavigate(service.path)}
                            className={`h-100 transition-all duration-300 border-0 bg-gradient-to-b from-white to-gray-50
                                ${service.disabled 
                                    ? 'opacity-60 cursor-not-allowed' 
                                    : 'hover:shadow-lg cursor-pointer hover:-translate-y-2'}`}
                            style={{ minHeight: '280px' }}
                        >
                            <Card.Body className="d-flex flex-column align-items-center text-center p-5">
                                {service.icon}
                                <Card.Title className="text-2xl font-bold mb-3 relative">
                                    {service.title}
                                    {service.badge && (
                                        <Badge 
                                            bg="warning" 
                                            className="ml-2 position-absolute -top-2"
                                        >
                                            {service.badge}
                                        </Badge>
                                    )}
                                </Card.Title>
                                <Card.Text className="text-muted-foreground">
                                    {service.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
} 