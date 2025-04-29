import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alloy Wheel & Tyre Blog Exeter | Expert Tips | Tevy Services',
  description: 'Expert advice on alloy wheel repair, tyre services & maintenance from Exeter specialists. Guides, tips & industry insights for car owners!',
  keywords: 'alloy wheel repair blog, wheel refurbishment Exeter, tyre services Exeter, automotive blog, alloy wheel maintenance, car care tips Exeter',
  openGraph: {
    title: 'Alloy Wheel & Tyre Services Blog | Tevy Services Exeter',
    description: 'Professional advice on wheel repair, refurbishment & tyre services from Exeter specialists. Read our expert guides and tips.',
    images: [
      {
        url: '/images/blog-header.jpg',
        width: 1200,
        height: 630,
        alt: 'Tevy Services Blog'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tevyservices.com/blog'
  }
} 