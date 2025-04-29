import React from 'react'
import LocalBusinessSchema from './LocalBusinessSchema'
import ReviewSchema from './ReviewSchema'
import BreadcrumbSchema from './BreadcrumbSchema'

type SchemaMarkupProps = {
  breadcrumbs?: {
    name: string;
    path: string;
  }[];
  showReviews?: boolean;
}

const SchemaMarkup = ({ breadcrumbs, showReviews = true }: SchemaMarkupProps) => {
  return (
    <>
      <LocalBusinessSchema />
      {showReviews && <ReviewSchema />}
      {breadcrumbs && <BreadcrumbSchema items={breadcrumbs} />}
    </>
  )
}

export default SchemaMarkup 