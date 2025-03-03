import Link from 'next/link'

export default function Header() {
  return (
    <header className="container mx-auto max-w-screen-md p-4">
      <Link href="/">Hello, World</Link>
    </header>
  )
}
