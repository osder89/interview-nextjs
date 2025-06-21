// models/Review.ts
import type { Prisma } from "@prisma/client"

export type IReview = Prisma.reviewsGetPayload<{}>

export class Review {
  id: number
  bookTitle: string
  rating: number
  review?: string | null
  mood?: string | null
  userId: number
  createdAt: Date
  updatedAt: Date

  constructor(data: IReview) {
    this.id = data.id
    this.bookTitle = data.booktitle
    this.rating = data.rating
    this.review = data.review
    this.mood = data.mood
    this.userId = data.userId
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
