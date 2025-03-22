import { Pool } from 'pg'

// Supabase 연결 정보
const pool = new Pool({
  user: process.env.SUPABASE_USER || 'postgres',
  host: process.env.SUPABASE_HOST || 'db.sezwwmgenjvqmbzdxnit.supabase.co',
  database: process.env.SUPABASE_DB || 'postgres',
  password: process.env.SUPABASE_PASSWORD,
  port: parseInt(process.env.SUPABASE_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false  // 개발 환경에서는 이렇게 설정, 프로덕션에서는 true로 변경
  }
})

// 연결 테스트
pool.on('connect', () => {
  console.log('Supabase PostgreSQL 데이터베이스에 연결되었습니다.')
})

pool.on('error', (err) => {
  console.error('PostgreSQL 연결 오류:', err)
})

export default pool 