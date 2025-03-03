import { ReactNode } from 'react'

export default async function Content({ children }: { children: ReactNode }) {
  return <main className="container mx-auto max-w-screen-md flex-1 p-4">{children}</main>
}
