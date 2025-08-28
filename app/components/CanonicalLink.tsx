'use client'

import { usePathname } from 'next/navigation'
import Head from 'next/head'

export default function CanonicalLink() {
  const pathname = usePathname()
  const canonicalUrl = `https://www.tevyservices.co.uk${pathname}`

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}