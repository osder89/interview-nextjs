// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const users = [
    { id: 1, name: 'Juan' },
    { id: 2, name: 'Marta' },
  ]

  return NextResponse.json(users)
}