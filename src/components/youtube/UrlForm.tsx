'use client'

import { Form, Button } from 'react-bootstrap'
import { BsSend } from 'react-icons/bs'

interface UrlFormProps {
  url: string;
  loading: boolean;
  onUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function UrlForm({ url, loading, onUrlChange, onSubmit }: UrlFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-4">
        <Form.Label>YouTube URL</Form.Label>
        <Form.Control
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
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
              <span className="spinner-border spinner-border-sm me-2" />
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
  )
} 