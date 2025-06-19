export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { initDB } from '@/utils/db'
import { removeReview } from '@/services/reviewService'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function DELETE(request: Request) {
  await initDB()

  const token = (await cookies()).get('token')?.value
  if (!token) return NextResponse.json(null, { status: 401 })

  let payload: { id: number }
  try {
    payload = verify(token, JWT_SECRET) as { id: number }
  } catch {
    return NextResponse.json(null, { status: 401 })
  }

  const url = new URL(request.url)
  const parts = url.pathname.split('/')
  const reviewId = parseInt(parts.at(-1)!, 10)

  try {
    await removeReview(reviewId, payload.id)
  } catch {
    return NextResponse.json(null, { status: 403 })
  }

  return new NextResponse(null, { status: 204 })
}
