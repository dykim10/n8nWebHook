'use client'

import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { BsMicFill, BsEnvelopeFill, BsRobot } from 'react-icons/bs'

export default function Home() {
    const router = useRouter()

    const services = [
        {
            title: '음성 메모',
            description: '음성으로 메모를 쉽게 작성하고 관리하세요',
            icon: <BsMicFill className="text-4xl mb-4 text-gray-400" />,
            path: '/voice-memo',
            color: 'rgb(var(--primary-rgb))',
            disabled: true,
            badge: '준비중',
        },
        {
            title: '이메일 보내기',
            description: '손쉽게 이메일을 작성하고 발송하세요',
            icon: <BsEnvelopeFill className="text-4xl mb-4 text-info" />,
            path: '/email',
            color: 'rgb(var(--info-rgb))',
            disabled: false,
        },
        {
            title: 'AI 에이전트',
            description: 'LLM 기반 AI 에이전트와 대화하세요',
            icon: <BsRobot className="text-4xl mb-4 text-success" />,
            path: '/ai-agent',
            color: 'rgb(var(--success-rgb))',
            disabled: false,
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
                            onClick={() => !service.disabled && router.push(service.path)}
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

            <div className="mt-16 text-center p-8 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                    시작하기
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    위의 서비스 중 원하시는 기능을 선택하여 시작해보세요. 
                    각 서비스는 직관적인 인터페이스로 구성되어 있어 쉽게 사용하실 수 있습니다.
                </p>
            </div>
        </Container>
    )
}
