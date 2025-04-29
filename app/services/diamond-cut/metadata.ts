import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diamond Cut Alloy Wheel Repair Exeter | Tevy Services',
  description: 'Premium diamond cut alloy wheel repair in Exeter. CNC precision, same-day service & lasting finish. Restore your wheels to showroom quality!',
  keywords: [
    'diamond cut alloy wheel repair Exeter',
    'diamond cut wheel refurbishment Exeter',
    'alloy wheel restoration Exeter',
    'diamond cutting service Exeter',
    'CNC lathe repair',
    'wheel corrosion prevention',
    'factory finish repair',
    'alloy wheel refurbishment Exeter',
    'diamond cut finish'
  ].join(', '),
  openGraph: {
    title: 'Diamond Cut Alloy Wheel Repair Exeter | CNC Technology',
    description: 'Professional diamond cut wheel repair in Exeter. CNC precision, premium lacquer protection & mobile service. Book today!',
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
    title: 'Diamond Cut Alloy Wheel Repair Exeter',
    description: 'Expert wheel restoration in Exeter. CNC precision, factory-grade finish & mobile service available.',
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