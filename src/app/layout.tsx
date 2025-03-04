import React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Content from '@/app/components/Content'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Sandy\'s Blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-4 sm:px-6 md:px-8 lg:px-12">
          <Header />
          <Content>{children}</Content>
          <Footer />
        </div>
      </body>
    </html>
  )
}
