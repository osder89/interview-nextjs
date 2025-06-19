export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { initDB } from '@/utils/db'
import { removeReview } from '@/services/reviewService'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function DELETE(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  await initDB()

  const token = (await cookies()).get('token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let payload: { id: number }
  try {
    payload = verify(token, JWT_SECRET) as { id: number }
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  const reviewId = parseInt(id, 10)

  try {
    await removeReview(reviewId, payload.id)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 403 })
  }

  return new NextResponse(null, { status: 204 })
}
