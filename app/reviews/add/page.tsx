'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaStar } from 'react-icons/fa'

export default function AddReviewModal() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [form, setForm] = useState({ bookTitle: '', review: '', rating: 0 })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  const setRating = (i: number) =>
    setForm(prev => ({ ...prev, rating: i + 1 }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.push('/reviews')
  }

  const handleCancel = () => {
    setOpen(false)
    router.push('/reviews')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold">Add New Review</h2>
        <input
          name="bookTitle"
          value={form.bookTitle}
          onChange={handleChange}
          placeholder="Book Title"
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          name="review"
          value={form.review}
          onChange={handleChange}
          placeholder="Your comments"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none"
        />
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              onClick={() => setRating(i)}
              className={`cursor-pointer ${
                i < form.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
