

import Users from '@/models/user'
import Reviews from '../models/reviews'


export const getAllReviews = async () =>
  Reviews.findAll({
    include: [{
      model: Users,
      as: 'User',
      attributes: ['name']
    }],
    order: [['createdAt', 'DESC']],
  })

export const getReviewById = async (id: number) =>
  Reviews.findByPk(id)

export const createReview = async (data: {
  userId: number
  bookTitle: string
  rating: number
  review: string
  mood: string
}) =>
  Reviews.create({
    userId: data.userId,
    booktitle: data.bookTitle,
    rating: data.rating,
    review: data.review,
    mood: data.mood,
  })

export const deleteReview = async (id: number) => {
  const entry = await Reviews.findByPk(id)
  if (!entry) return null
  await entry.destroy()
  return entry
}