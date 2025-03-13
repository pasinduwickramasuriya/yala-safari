import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const packages = await prisma.package.findMany()
  return NextResponse.json(packages)
}

export async function POST(request: Request) {
  const data = await request.json()
  const pkg = await prisma.package.create({ data })
  return NextResponse.json(pkg)
}