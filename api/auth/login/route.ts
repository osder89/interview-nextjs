export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
 
import { NextResponse } from 'next/server'
import { loginUser } from '../../../services/authService'
import { serialize } from 'cookie'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const token = await loginUser(email, password)
  const cookie = serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60, 
    sameSite: 'lax',
  })
  const response = NextResponse.json({ success: true })
  response.headers.set('Set-Cookie', cookie)
  return response
}
