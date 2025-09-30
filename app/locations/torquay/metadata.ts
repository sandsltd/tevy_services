import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alloy Wheel Refurbishment Torquay & Paignton | Mobile Service | TEVY Services',
  description: 'Professional alloy wheel refurbishment in Torquay, Paignton & Brixham. Diamond cutting, custom painting & repairs. Mobile service or free collection. Same day service available.',
  keywords: 'alloy wheel refurbishment torquay, alloy wheel repair torquay, alloy wheel refurbishment paignton, mobile wheel refurbishment torquay, diamond cut alloys torquay, wheel painting torquay, alloy wheel repair paignton, tevy services torquay, torbay alloy wheel repair',
  openGraph: {
    title: 'Alloy Wheel Refurbishment Torquay & Paignton | TEVY Services',
    description: 'Professional alloy wheel refurbishment serving Torquay, Paignton and Torbay. Mobile service available. Free quotes, same day service.',
    images: [{ url: '/images/mobile-service-og.jpg', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alloy Wheel Refurbishment Torquay | TEVY Services',
    description: 'Professional alloy wheel refurbishment serving Torquay and Torbay. Mobile service available.',
  },
  alternates: {
    canonical: 'https://www.tevyservices.co.uk/locations/torquay'
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