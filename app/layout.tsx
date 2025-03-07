import React from 'react'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from './components/GoogleAnalytics'

export const metadata = {
  title: 'Tevy Services',
  description: 'Professional Wheel & Tyre Specialists',
  icons: {
    icon: [
      { url: '/favicon_io-14/favicon.ico' },
      { url: '/favicon_io-14/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io-14/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon_io-14/apple-touch-icon.png' }
    ],
    other: [
      { rel: 'manifest', url: '/favicon_io-14/site.webmanifest' }
    ]
  }
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