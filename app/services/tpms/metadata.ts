import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TPMS Services Exeter | Tyre Pressure Monitoring | Tevy Services',
  description: 'Professional TPMS repair & replacement in Exeter. Fast mobile service, diagnostic testing & programming. Keep your vehicle safe & compliant!',
  keywords: 'TPMS service Exeter, tyre pressure monitoring system, TPMS sensor replacement, TPMS programming Exeter, mobile TPMS service, alloy wheel repair Exeter',
  openGraph: {
    title: 'TPMS Repair & Replacement Exeter | Tevy Services',
    description: 'Expert TPMS diagnostics and repair in Exeter. Mobile service, fast turnaround & competitive pricing. Book your appointment today!',
    images: [
      {
        url: '/images/services/tpms-service.jpg',
        width: 1200,
        height: 630,
        alt: 'TPMS Repair and Replacement Service'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tevyservices.com/services/tpms'
  }
} 