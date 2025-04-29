import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Tevy Services Exeter | Alloy Wheel & Tyre Specialists',
  description: 'Contact Tevy Services in Exeter for alloy wheel repair, tyre services & free quotes. Call, email or visit our Marsh Barton workshop today!',
  keywords: 'contact Tevy Services, alloy wheel repair Exeter, tyre services Exeter, wheel refurbishment contact, Marsh Barton garage',
  openGraph: {
    title: 'Contact Us | Tevy Services Exeter',
    description: 'Get in touch with Exeter\'s alloy wheel and tyre specialists. Mobile service available throughout Exeter and surrounding areas.',
    images: [
      {
        url: '/images/contact-us.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Tevy Services'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tevyservices.com/contact'
  }
} 