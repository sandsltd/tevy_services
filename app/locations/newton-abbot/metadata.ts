import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alloy Wheel Refurbishment Newton Abbot | Mobile Service | TEVY Services',
  description: 'Professional alloy wheel refurbishment in Newton Abbot. Diamond cutting, painting & repairs. Mobile service or collection available. Same day service, 12 month guarantee.',
  keywords: 'alloy wheel refurbishment newton abbot, alloy wheel repair newton abbot, mobile wheel refurbishment newton abbot, diamond cut alloys newton abbot, wheel painting newton abbot, tevy services newton abbot',
  openGraph: {
    title: 'Alloy Wheel Refurbishment Newton Abbot | TEVY Services',
    description: 'Professional alloy wheel refurbishment serving Newton Abbot. Mobile service available. Free quotes, same day service.',
    images: [{ url: '/images/mobile-service-og.jpg', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alloy Wheel Refurbishment Newton Abbot | TEVY Services',
    description: 'Professional alloy wheel refurbishment serving Newton Abbot. Mobile service available.',
  },
  alternates: {
    canonical: 'https://www.tevyservices.co.uk/locations/newton-abbot'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}