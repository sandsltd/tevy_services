import React from 'react'

const LocalBusinessSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Tevy Services',
    description: 'Professional alloy wheel repair and tyre specialists in Exeter, offering mobile service throughout Devon.',
    url: 'https://www.tevyservices.com',
    logo: 'https://www.tevyservices.com/images/logo.png',
    image: 'https://www.tevyservices.com/images/og-image.jpg',
    telephone: '07572 634898',
    email: 'info@tevyservices.com', // Replace with actual email
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 2, Quicks Units, Buttlands Industrial Estate, Totnes Road',
      addressLocality: 'Ipplepen',
      addressRegion: 'Devon',
      postalCode: 'TQ12 5UE',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.4791',
      longitude: '-3.6463'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00'
      }
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '50.4791',
        longitude: '-3.6463'
      },
      geoRadius: '30000'
    },
    sameAs: [
      'https://www.facebook.com/tevyservices',
      'https://www.instagram.com/tevyservices'
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '50.4791',
        longitude: '-3.6463'
      },
      geoRadius: '30000'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Alloy Wheel & Tyre Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Diamond Cut Alloy Wheel Repair',
            url: 'https://www.tevyservices.com/services/diamond-cut'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Alloy Wheel Painting',
            url: 'https://www.tevyservices.com/services/painted-alloys'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TPMS Services',
            url: 'https://www.tevyservices.com/services/tpms'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tyre Repair',
            url: 'https://www.tevyservices.com/services/tyre-repair'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile Tyre Replacement',
            url: 'https://www.tevyservices.com/services/tyre-replacement'
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default LocalBusinessSchema 