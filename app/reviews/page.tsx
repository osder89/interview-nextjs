import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verify } from 'jsonwebtoken'
import { initDB } from '@/utils/db'
import { getAllReviews } from '@/repositories/reviewRepository'
import ReviewsClient from './ReviewsClient'


const JWT_SECRET = process.env.JWT_SECRET!

export default async function ReviewsPage() {
    const token = (await cookies()).get('token')?.value

  if (!token) return redirect('/login')
  try {
    verify(token, JWT_SECRET)
  } catch {
    return redirect('/login')
  }
  await initDB()
  const raw = await getAllReviews()
  const reviews = raw.map(r => r.get({ plain: true }))
  return <ReviewsClient reviews={reviews} />
}