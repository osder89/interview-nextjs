export const dynamic = 'force-dynamic'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verify } from 'jsonwebtoken'
import { initDB } from '@/utils/db'
import { getAllReviews } from '@/repositories/reviewRepository'
import ReviewsClient from './ReviewsClient'

const JWT_SECRET = process.env.JWT_SECRET!

export default async function ReviewsPage() {
  const token = (await cookies()).get('token')?.value;

  if (!token) return redirect('/login');

  try {
    verify(token, JWT_SECRET);
  } catch {
    return redirect('/login');
  }

  await initDB();
  const raw = await getAllReviews();
  const reviews = raw.map((r: any) => ({
    id: r.id,
    booktitle: r.booktitle,
    rating: r.rating,
    review: r.review ?? '',
    mood: r.mood ?? '',
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
    User: { name: r.users.name }
  }));

  return <ReviewsClient reviews={reviews} />;
}

