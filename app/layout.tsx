import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ebay Tool-A',
  description: 'Professional eBay Template Editor with Multi-language Support',
  generator: 'Ebay Tool-A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
