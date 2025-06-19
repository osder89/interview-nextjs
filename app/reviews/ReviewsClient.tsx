'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaStar, FaRegStar, FaPlus, FaTrash } from 'react-icons/fa'

interface Review {
  id: number
  booktitle: string
  rating: number
  review: string
  mood: string
  createdAt: string
  User: { name: string }
}

interface Props {
  reviews: Review[]
}

export default function ReviewsClient({ reviews: initialReviews }: Props) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    bookTitle: '',
    review: '',
    rating: 0,
    mood: ''
  })
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // open add-review modal
  const openModal = () => {
    setForm({ bookTitle: '', review: '', rating: 0, mood: '' })
    setShowModal(true)
  }
  const closeModal = () => setShowModal(false)

  // open delete-confirm modal for a given review id
  const confirmDelete = (id: number) => setDeleteId(id)
  const cancelDelete = () => setDeleteId(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const setRating = (i: number) =>
    setForm(f => ({ ...f, rating: i + 1 }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form)
    })
    const updated = await fetch('/api/reviews').then(r => r.json())
    setReviews(updated)
    closeModal()
  }

  const handleDelete = async () => {
    if (deleteId === null) return
    await fetch(`/api/reviews/${deleteId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const updated = await fetch('/api/reviews').then(r => r.json())
    setReviews(updated)
    cancelDelete()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Banner */}
        <div className="relative h-64">
          <Image
            src="/stranger-things-poster.jpeg"
            alt="Reviews Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-between px-6">
            <h1 className="text-4xl font-bold text-white">Movie Reviews</h1>
            <button
              onClick={openModal}
              className="flex items-center space-x-1 border border-white/50 hover:border-opacity-80 text-white px-3 py-1 rounded-md transition"
            >
              <FaPlus />
              <span className="text-sm">Add Review</span>
            </button>
          </div>
        </div>

        {/* Reviews list */}
        <div className="space-y-6 p-6 max-w-2xl mx-auto">
          {reviews.map(r => (
            <div key={r.id} className="bg-gray-50 p-6 rounded-lg shadow relative">
              {/* Delete button */}
              <button
                onClick={() => confirmDelete(r.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
                aria-label="Delete review"
              >
                <FaTrash />
              </button>

              <h2 className="text-2xl font-semibold mb-2">{r.booktitle}</h2>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) =>
                  i < r.rating ? (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 mr-1" />
                  )
                )}
                <span className="ml-2 text-gray-600">{r.rating}/5</span>
              </div>
              <p className="text-gray-700 mb-4">{r.review}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>By {r.User.name}</span>
                <span>{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-black/20"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Add New Review
            </h2>
            <input
              name="bookTitle"
              value={form.bookTitle}
              onChange={handleChange}
              placeholder="Book Title"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-800"
            />
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              placeholder="Your comments"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-800"
            />
            
            <div className="flex items-center space-x-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  onClick={() => setRating(i)}
                  className={`cursor-pointer ${
                    i < form.rating ? 'text-yellow-400' : 'text-gray-300'
                  } text-2xl`}
                />
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this review?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
