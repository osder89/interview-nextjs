export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { initDB } from '@/utils/db'
import { getReviews, addReview, removeReview } from '@/services/reviewService'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET() {
  await initDB()
  const reviews = await getReviews()
  return NextResponse.json(reviews)
}

export async function POST(req: Request) {
  await initDB()
  const token = (await cookies()).get('token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let payload: { id: number }
  try {
    payload = verify(token, JWT_SECRET) as { id: number }
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { bookTitle, rating, review, mood } = await req.json()
  const newReview = await addReview({
    userId: payload.id,
    bookTitle,
    rating,
    review,
    mood,
  })
  return NextResponse.json(newReview, { status: 201 })
}


