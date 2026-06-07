import NotFoundAnimation from '@/components/animations/not-found-animation/not-found-animation'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <NotFoundAnimation />
      <p className='font-medium'>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className='text-blue-600 underline font-light'>Go back home</Link>
    </div>
  )
}
