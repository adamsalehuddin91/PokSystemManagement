import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SwiftStay — Sistem Pengurusan Homestay',
  description: 'CRM dan laman web untuk owner homestay dan rumah sewa Malaysia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms">
      <body className="antialiased">{children}</body>
    </html>
  )
}
