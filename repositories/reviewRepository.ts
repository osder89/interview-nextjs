import prisma from '@/utils/prisma'

export const getAllReviews = async () => {
  return await prisma.reviews.findMany({
    include: {
      users: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const getReviewById = async (id: number) => {
  return await prisma.reviews.findUnique({
    where: { id }
  })
}

export const createReview = async (data: {
  userId: number
  bookTitle: string
  rating: number
  review: string
  mood: string
}) => {
  return await prisma.reviews.create({
    data: {
      userId: data.userId,
      booktitle: data.bookTitle,
      rating: data.rating,
      review: data.review,
      mood: data.mood,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })
}

export const deleteReview = async (id: number) => {
  const entry = await prisma.reviews.findUnique({
    where: { id }
  })
  if (!entry) return null
  return await prisma.reviews.delete({
    where: { id }
  })
}
