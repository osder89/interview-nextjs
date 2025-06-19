export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verify } from 'jsonwebtoken'
import { initDB } from '@/utils/db'
import { getAllReviews } from '@/repositories/reviewRepository'
import ReviewsClient from './ReviewsClient'

const JWT_SECRET = process.env.JWT_SECRET!

export default async function ReviewsPage() {
  const token = (await cookies()).get('token')?.value
  let validToken = false

  if (token) {
    try {
      verify(token, JWT_SECRET)
      validToken = true
    } catch {
      validToken = false
    }
  }

  if (!validToken) {
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content="0; url=/login" />
        </head>
      </html>
    )
  }

  await initDB()
  const raw = await getAllReviews()
  const reviews = raw.map(r => r.get({ plain: true }))

  return <ReviewsClient reviews={reviews} />
}


