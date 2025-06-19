import * as reviewRepo from '@/repositories/reviewRepository'
import Reviews from '@/models/reviews'
import { UniqueConstraintError } from 'sequelize'

export const getReviews = async () =>
  reviewRepo.getAllReviews()

export const addReview = async (data: {
  userId: number
  bookTitle: string
  rating: number
  review: string
  mood: string
}) => {
  try {
    const entry = await reviewRepo.createReview(data)
    return entry
  } catch (e) {
    if (e instanceof UniqueConstraintError) throw new Error('Duplicate entry')
    throw e
  }
}

export const removeReview = async (id: number, userId: number) => {
  const entry = await Reviews.findByPk(id)
  if (!entry) throw new Error('Review not found')
  if (entry.userId !== userId) throw new Error('Not authorized')
  await entry.destroy()
  return entry
}
