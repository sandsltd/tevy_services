import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alloy Wheel Repair Devon | Mobile Service | Tevy Services',
  description: 'Expert alloy wheel repair in Devon. Diamond cutting, custom painting & TPMS. 5-star mobile service with same-day availability. Book now!',
  keywords: 'alloy wheel repair Devon, wheel refurbishment Devon, mobile wheel repair, diamond cut alloys Devon, alloy wheel painting Devon, TPMS repair',
  openGraph: {
    title: 'Alloy Wheel Repair & Refurbishment Devon | Tevy Services',
    description: 'Expert alloy wheel repair in Devon with free callout. Diamond cutting, custom finishes & 5-star rated service. Book today!',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tevy Services Alloy Wheel Repair Devon'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alloy Wheel Repair Devon | Mobile Service',
    description: 'Professional wheel repair & refurbishment in Devon. Diamond cutting, custom painting & 5-star service.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://tevyservices.com'
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