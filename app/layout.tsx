import React from 'react'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from './components/GoogleAnalytics'
import { Metadata } from 'next'
import SchemaMarkup from './components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Alloy Wheel Repair Exeter | Tevy Services | 5-Star Rated',
  description: 'Expert alloy wheel repair in Exeter. Fast, affordable, and mobile service with 5-star reviews. Book now for same-day service!',
  metadataBase: new URL('https://www.tevyservices.co.uk'),
  alternates: {
    canonical: 'https://www.tevyservices.co.uk',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.tevyservices.co.uk',
    siteName: 'Tevy Services',
    title: 'Alloy Wheel Repair Exeter | Tevy Services | 5-Star Rated',
    description: 'Expert alloy wheel repair in Exeter. Fast, affordable, and mobile service with 5-star reviews.',
    images: [
      {
        url: '/images/services/workshop_exeter.jpeg',
        width: 1200,
        height: 630,
        alt: 'Tevy Services - Alloy Wheel Repair Exeter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alloy Wheel Repair Exeter | Tevy Services',
    description: 'Expert alloy wheel repair in Exeter. Mobile service available.',
    images: ['/images/services/workshop_exeter.jpeg'],
  },
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
        <SchemaMarkup 
          breadcrumbs={[
            { name: 'Home', path: '/' }
          ]}
        />
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