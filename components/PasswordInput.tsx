'use client'

import { useState, useRef, useEffect, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function PasswordInput({ className = '', ...props }: Props) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e)
    setVisible(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(false), 1000)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <input
      {...props}
      type={visible ? 'text' : 'password'}
      onChange={handleChange}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      className={`
        w-full
        border border-gray-300
        rounded px-3 py-2
        placeholder-gray-400 text-black
        focus:outline-none focus:ring-2 focus:ring-blue-200
        ${className}
      `}
    />
  )
}