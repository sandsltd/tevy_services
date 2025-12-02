import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diamond Cut Alloy Wheel Repair Exeter | Same-Day | Call 07572 634898',
  description: 'Diamond cut alloy wheel repair Exeter & Devon. CNC lathe restoration, same-day service, mobile available. Factory finish guaranteed. Marsh Barton workshop. Call now!',
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
    title: 'Diamond Cut Alloy Repair Exeter | Same-Day Service | Tevy Services',
    description: 'Diamond cut wheel repair in Exeter. CNC lathe precision, mobile service available. Factory finish. Call 07572 634898!',
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
    canonical: 'https://www.tevyservices.co.uk/services/diamond-cut'
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