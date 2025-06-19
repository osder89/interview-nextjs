export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { initDB } from '@/utils/db'
import { removeReview } from '@/services/reviewService'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await initDB()

  const token = (await cookies()).get('token')?.value
  if (!token) return NextResponse.json(null, { status: 401 })

  let payload: { id: number }
  try {
    payload = verify(token, JWT_SECRET) as { id: number }
  } catch {
    return NextResponse.json(null, { status: 401 })
  }

  const reviewId = parseInt(params.id, 10)

  try {
    await removeReview(reviewId, payload.id)
  } catch {
    return NextResponse.json(null, { status: 403 })
  }

  return new NextResponse(null, { status: 204 })
}
