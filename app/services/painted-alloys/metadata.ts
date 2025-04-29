import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alloy Wheel Painting Exeter | Custom Colours | Tevy Services',
  description: 'Professional alloy wheel painting in Exeter. Custom colours, mobile service & showroom finish. Transform your wheels today!',
  keywords: 'alloy wheel painting Exeter, wheel repair Exeter, alloy wheel refurbishment, custom wheel colours, mobile wheel painting, alloy wheel repair Exeter',
  openGraph: {
    title: 'Alloy Wheel Painting & Refurbishment Exeter | Tevy Services',
    description: 'Expert alloy wheel painting in Exeter with custom colours and mobile service. Transform your wheels today!',
    images: [
      {
        url: '/images/services/painted-alloys-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Alloy Wheel Painting Service'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tevyservices.com/services/painted-alloys'
  }
} 