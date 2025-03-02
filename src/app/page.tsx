import React from 'react'
import Header from '@/app/components/Header'
import Content from '@/app/components/Content'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-4 sm:px-6 md:px-8 lg:px-12">
      <Header />
      <Content />
      <Footer />
    </div>
  )
}
