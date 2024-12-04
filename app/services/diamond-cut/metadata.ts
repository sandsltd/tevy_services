import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diamond Cut Alloy Wheel Repair | Professional CNC Service',
  description: 'Expert diamond cut alloy wheel repair using state-of-the-art CNC lathe technology. Factory-grade finish with powder coating and lacquer protection to prevent corrosion. Same-day service available.',
  keywords: [
    'diamond cut alloy wheel repair',
    'diamond cut wheel refurbishment',
    'alloy wheel restoration',
    'diamond cutting service',
    'powder coat finish',
    'CNC lathe repair',
    'wheel corrosion prevention',
    'factory finish repair',
    'alloy wheel refurbishment',
    'diamond cut finish'
  ].join(', '),
  openGraph: {
    title: 'Diamond Cut Alloy Wheel Repair | CNC Lathe Technology',
    description: 'Professional diamond cut wheel repair using state-of-the-art CNC technology. Factory-grade finish with powder coating and lacquer protection.',
    images: [
      {
        url: '/images/services/diamond-cut-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Diamond Cut Alloy Wheel Repair Process'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diamond Cut Alloy Wheel Repair',
    description: 'Expert wheel restoration using CNC lathe technology. Factory-grade finish with corrosion protection.',
    images: ['/images/services/diamond-cut-hero.jpg'],
  },
  alternates: {
    canonical: 'https://tevyservices.com/services/diamond-cut'
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
  },
  verification: {
    google: 'your-google-verification-code',
  },
  authors: [{ name: 'TEVY Services' }],
  category: 'Automotive Services',
  other: {
    'format-detection': 'telephone=no',
  }
} 