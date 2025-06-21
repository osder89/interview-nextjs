import * as reviewRepo from '@/repositories/reviewRepository'
import { Prisma } from '@prisma/client'

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
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      throw new Error('Duplicate entry')
    }
    throw e
  }
}

export const removeReview = async (id: number, userId: number) => {
  const entry = await reviewRepo.getReviewById(id)
  if (!entry) throw new Error('Review not found')
  if (entry.userId !== userId) throw new Error('Not authorized')

  await reviewRepo.deleteReview(id)
  return entry
}
