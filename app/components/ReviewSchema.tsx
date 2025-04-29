import React from 'react'

const ReviewSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Tevy Services',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'James Wilson'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1'
        },
        datePublished: '2023-10-15',
        reviewBody: 'Excellent service from Tevy! They came to my home and repaired my alloy wheels on the spot. Highly recommend for anyone in Exeter needing wheel repairs.'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah Thompson'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1'
        },
        datePublished: '2023-09-22',
        reviewBody: 'Fantastic mobile tyre replacement service. Quick response, fair pricing and professional work. Will definitely use again!'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Michael Brown'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1'
        },
        datePublished: '2023-11-03',
        reviewBody: 'Diamond cut finish on my alloys looks better than new. Great value and excellent workmanship from the Tevy team in Exeter.'
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default ReviewSchema 