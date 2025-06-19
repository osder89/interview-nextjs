import { initDB } from '@/utils/db'
import { getAllReviews } from '@/repositories/reviewRepository'
import ReviewsClient from './ReviewsClient'

export default async function ReviewsPage() {
  await initDB()
  const raw = await getAllReviews()
  const reviews = raw.map(r => r.get({ plain: true }))
  return <ReviewsClient reviews={reviews} />
}