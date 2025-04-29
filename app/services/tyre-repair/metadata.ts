import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tyre Repair Exeter | Mobile Puncture Repair | Tevy Services',
  description: 'Fast mobile tyre repair in Exeter. Professional puncture repairs, 24/7 emergency service & competitive pricing. Back on the road in no time!',
  keywords: 'tyre repair Exeter, puncture repair Exeter, mobile tyre service, emergency tyre repair, alloy wheel repair Exeter, tyre puncture fix Exeter',
  openGraph: {
    title: 'Mobile Tyre Repair Service Exeter | Tevy Services',
    description: 'Professional tyre repair in Exeter. Fast, reliable & mobile service with no callout fee. Emergency repairs available 24/7.',
    images: [
      {
        url: '/images/services/tyre-repair-service.jpg',
        width: 1200,
        height: 630,
        alt: 'Mobile Tyre Repair Service'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tevyservices.com/services/tyre-repair'
  }
} 