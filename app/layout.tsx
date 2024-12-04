import React from 'react'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

export const metadata = {
  title: 'Tevy Services',
  description: 'Professional Wheel & Tyre Specialists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://www.tiktok.com/embed.js"></script>
      </head>
      <body suppressHydrationWarning>
        <div suppressHydrationWarning>
          {children}
        </div>
      </body>
    </html>
  )
}