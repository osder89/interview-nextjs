'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa'
import PasswordInput from '@/components/PasswordInput'


export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Error desconocido')
        return
      }
      router.push('/login')
    } catch {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Panel Izquierdo */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 lg:px-16 bg-white">
        <div className="max-w-sm w-full">
          {/* Logo */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">InsideBox</h1>
          </div>

          {/* Títulos */}
          <p className="text-sm text-gray-500 mb-2">Start your journey</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Sign In to InsideBox
          </h2>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="
                  w-full
                  border border-gray-300
                  rounded
                  px-3 py-2
                  placeholder-gray-400
                  text-black
                  focus:outline-none focus:ring-2 focus:ring-blue-200
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <PasswordInput
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Botón Sign In */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 rounded-lg font-semibold text-white transition 
                ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Social */}
          <p className="mt-6 text-center text-sm text-gray-500">or sign up with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              aria-label="Sign up with Facebook"
              className="p-3 border border-gray-300 rounded hover:bg-gray-100"
            >
              <FaFacebookF className="text-gray-600" />
            </button>
            <button
              aria-label="Sign up with Google"
              className="p-3 border border-gray-300 rounded hover:bg-gray-100"
            >
              <FaGoogle className="text-gray-600" />
            </button>
            <button
              aria-label="Sign up with Apple"
              className="p-3 border border-gray-300 rounded hover:bg-gray-100"
            >
              <FaApple className="text-gray-600" />
            </button>
          </div>

          {/* Link Sign In */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Have not an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Panel Derecho (imagen) */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/login.png"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
