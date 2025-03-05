import React from 'react'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from './components/GoogleAnalytics'

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
        <script async src="https://player.vimeo.com/api/player.js"></script>
      </head>
      <body suppressHydrationWarning>
        <div suppressHydrationWarning>
          {children}
        </div>
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  )
}