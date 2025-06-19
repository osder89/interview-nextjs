

import { NextResponse } from 'next/server'
import { registerUser, loginUser } from '../../../../services/authService'
import { serialize } from 'cookie'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()
  const user = await registerUser({ name, email, password })
  const token = await loginUser(email, password)
  const cookie = serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
    sameSite: 'lax',
  })
  const response = NextResponse.json({ user })
  response.headers.set('Set-Cookie', cookie)
  return response
}