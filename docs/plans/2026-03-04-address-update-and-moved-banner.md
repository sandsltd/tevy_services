# Address Update & "We've Moved" Banner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the business address from Marsh Barton, Exeter to the new Ipplepen location, and add a dismissible "we've moved" banner to every page.

**Architecture:** Create a `MovedBanner` client component and insert it into the root layout. Update address strings across all pages/components individually. No new dependencies required — uses React `useState`, `useEffect`, and `localStorage`.

**Tech Stack:** Next.js 14 (App Router), React, Tailwind CSS, TypeScript

---

## New Address

```
Unit 2, Quicks Units
Buttlands Industrial Estate
Totnes Road
Ipplepen
TQ12 5UE
```

---

### Task 1: Create the MovedBanner component

**Files:**
- Create: `app/components/MovedBanner.tsx`

**Step 1: Create the file**

```tsx
'use client'
import { useState, useEffect } from 'react'
import { X, MapPin } from 'lucide-react'

export default function MovedBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('moved-banner-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem('moved-banner-dismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="bg-amber-500 text-black w-full z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>We&apos;ve moved!</strong> Our new address is Unit 2, Quicks Units, Buttlands Industrial Estate, Totnes Road, Ipplepen, TQ12 5UE
          </span>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
```

**Step 2: Add to root layout**

Modify `app/layout.tsx` — add the import and insert `<MovedBanner />` as the first child inside `<body>`:

```tsx
import MovedBanner from './components/MovedBanner'

// Inside <body>:
<body suppressHydrationWarning>
  <div suppressHydrationWarning>
    <MovedBanner />
    {children}
  </div>
  <SpeedInsights />
  <GoogleAnalytics />
</body>
```

**Step 3: Verify manually**

Run `npm run dev`, open http://localhost:3000, confirm amber banner appears at top. Click ×, refresh — banner should stay hidden.

**Step 4: Commit**

```bash
git add app/components/MovedBanner.tsx app/layout.tsx
git commit -m "feat: add dismissible we've moved banner"
```

---

### Task 2: Update Footer address

**Files:**
- Modify: `app/components/Footer.tsx:31-34`

**Step 1: Replace old address**

Find:
```tsx
                  Unit 63, Yeoford Way<br />
                  Marsh Barton, Exeter<br />
                  EX2 8LB<br />
```

Replace with:
```tsx
                  Unit 2, Quicks Units<br />
                  Buttlands Industrial Estate<br />
                  Totnes Road, Ipplepen<br />
                  TQ12 5UE<br />
```

**Step 2: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "fix: update footer address to Ipplepen"
```

---

### Task 3: Update LocalBusinessSchema structured data

**Files:**
- Modify: `app/components/LocalBusinessSchema.tsx:17-21`

**Step 1: Replace address fields**

Find:
```tsx
      streetAddress: 'Unit 10, Marsh Barton Trading Estate', // Replace with actual address
      addressLocality: 'Exeter',
      addressRegion: 'Devon',
      postalCode: 'EX2 8XX', // Replace with actual postcode
```

Replace with:
```tsx
      streetAddress: 'Unit 2, Quicks Units, Buttlands Industrial Estate, Totnes Road',
      addressLocality: 'Ipplepen',
      addressRegion: 'Devon',
      postalCode: 'TQ12 5UE',
```

Also update geo coordinates (Ipplepen, Devon):
Find:
```tsx
      latitude: '50.7184', // Replace with actual coordinates
      longitude: '-3.5339'  // Replace with actual coordinates
```
Replace with:
```tsx
      latitude: '50.4791',
      longitude: '-3.6463'
```
(Update both `geo` and `serviceArea.geoMidpoint` blocks.)

**Step 2: Commit**

```bash
git add app/components/LocalBusinessSchema.tsx
git commit -m "fix: update LocalBusinessSchema address to Ipplepen"
```

---

### Task 4: Update Contact page

**Files:**
- Modify: `app/contact/page.tsx:10-11` (meta description)
- Modify: `app/contact/page.tsx:115-117` (displayed address)

**Step 1: Update meta description**

Find:
```tsx
  description: 'Contact Tevy Services for alloy wheel repair quotes in Exeter. Call 07572 634898 for same-day service. Unit 10, Marsh Barton Trading Estate.',
```
Replace with:
```tsx
  description: 'Contact Tevy Services for alloy wheel repair quotes. Call 07572 634898 for same-day service. Unit 2, Quicks Units, Ipplepen, TQ12 5UE.',
```

**Step 2: Update displayed address**

Find:
```tsx
                          Unit 10, Marsh Barton Trading Estate<br />
                          Exeter, Devon<br />
                          EX2 8XX
```
Replace with:
```tsx
                          Unit 2, Quicks Units<br />
                          Buttlands Industrial Estate, Totnes Road<br />
                          Ipplepen, TQ12 5UE
```

**Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "fix: update contact page address to Ipplepen"
```

---

### Task 5: Update service pages — address blocks

These three service pages all have an identical "Workshop Address" block. Update each.

**Files:**
- Modify: `app/services/tpms/page.tsx:450-452`
- Modify: `app/services/tyre-replacement/page.tsx:564-566`
- Modify: `app/services/tyre-repair/page.tsx:363-365`

**Step 1: In each file, find and replace**

Find (appears in all three):
```tsx
                    Marsh Barton Trading Estate<br />
                    Exeter, Devon<br />
                    Free customer parking available
```
Replace with:
```tsx
                    Unit 2, Quicks Units<br />
                    Buttlands Industrial Estate, Ipplepen, TQ12 5UE<br />
                    Free customer parking available
```

Also update any surrounding prose that says "Marsh Barton workshop" or "Marsh Barton facility" — change to "our Ipplepen workshop" or "our Ipplepen facility".

For `tyre-replacement/page.tsx` and `tyre-repair/page.tsx`, also update FAQ answers (lines ~636, ~661, ~682, ~398, ~403) that mention "Marsh Barton" to say "Ipplepen".

**Step 2: Commit**

```bash
git add app/services/tpms/page.tsx app/services/tyre-replacement/page.tsx app/services/tyre-repair/page.tsx
git commit -m "fix: update service page addresses and references to Ipplepen"
```

---

### Task 6: Update painted-alloys service page

**Files:**
- Modify: `app/services/painted-alloys/page.tsx`

**Step 1: Update schema address block (lines ~189-194)**

Find:
```tsx
  "address": {
    ...
    "streetAddress": "Marsh Barton",
    "addressLocality": "Exeter",
    "postalCode": "EX2",
```
Replace with:
```tsx
  "address": {
    ...
    "streetAddress": "Unit 2, Quicks Units, Buttlands Industrial Estate, Totnes Road",
    "addressLocality": "Ipplepen",
    "postalCode": "TQ12 5UE",
```

**Step 2: Update prose references**

Find all instances of `Marsh Barton` in this file and replace with `our Ipplepen workshop` / `Ipplepen` as appropriate to context.

**Step 3: Commit**

```bash
git add app/services/painted-alloys/page.tsx
git commit -m "fix: update painted-alloys page address to Ipplepen"
```

---

### Task 7: Update locations pages

**Files:**
- Modify: `app/locations/newton-abbot/page.tsx`
- Modify: `app/locations/torquay/page.tsx`

**Step 1: Replace Marsh Barton references**

In both files, replace references to "Marsh Barton facility" / "Marsh Barton workshop" with "our Ipplepen workshop".

**Step 2: Commit**

```bash
git add app/locations/newton-abbot/page.tsx app/locations/torquay/page.tsx
git commit -m "fix: update location pages to reference Ipplepen workshop"
```

---

### Task 8: Update homepage and remaining pages

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx` (meta description)
- Modify: `app/puncture-repairs/page.tsx`
- Modify: `app/mobile-alloy-wheel-refurbishment/page.tsx`
- Modify: `app/components/CoverageMap.tsx`
- Modify: `app/components/ServiceBooking.tsx`

**Step 1: app/layout.tsx meta description**

Find:
```tsx
  description: 'Alloy wheel refurbishment in Exeter & Devon. Diamond cut, painting, tyres. Mobile service or Marsh Barton workshop. Same-day repairs from £60. Call now!',
```
Replace with:
```tsx
  description: 'Alloy wheel refurbishment in Devon. Diamond cut, painting, tyres. Mobile service or our Ipplepen workshop. Same-day repairs from £60. Call now!',
```

**Step 2: app/page.tsx**

Replace all prose references to "Marsh Barton" with "Ipplepen" or "our Ipplepen workshop" to fit context. E.g.:
- "state-of-the-art Marsh Barton facility" → "state-of-the-art Ipplepen facility"
- "advanced facility in Marsh Barton Exeter" → "advanced facility in Ipplepen, Devon"

**Step 3: app/puncture-repairs/page.tsx**

Replace meta description and any "Marsh Barton workshop" text with Ipplepen equivalent.

**Step 4: app/mobile-alloy-wheel-refurbishment/page.tsx**

Replace "Marsh Barton" text with Ipplepen equivalent.

**Step 5: app/components/CoverageMap.tsx**

Find:
```tsx
            Please visit our workshop in Marsh Barton, Exeter for our full range of services
```
Replace with:
```tsx
            Please visit our workshop in Ipplepen, Devon for our full range of services
```

**Step 6: app/components/ServiceBooking.tsx**

Find:
```tsx
        description: 'Full service range including wheel refurbishment, tyres and TPMS at our Marsh Barton workshop',
```
Replace with:
```tsx
        description: 'Full service range including wheel refurbishment, tyres and TPMS at our Ipplepen workshop',
```

**Step 7: Commit**

```bash
git add app/page.tsx app/layout.tsx app/puncture-repairs/page.tsx app/mobile-alloy-wheel-refurbishment/page.tsx app/components/CoverageMap.tsx app/components/ServiceBooking.tsx
git commit -m "fix: update remaining Marsh Barton references to Ipplepen across site"
```

---

### Task 9: Final verification

**Step 1:** Run `npm run build` — confirm no TypeScript or build errors.

**Step 2:** Run `npm run dev` and spot-check:
- Home page — no "Marsh Barton" visible
- Contact page — new address shown
- Footer — new address shown
- Banner visible, dismisses correctly, stays dismissed on refresh
- `/services/tyre-replacement` — address block shows Ipplepen

**Step 3:** Search for any remaining "Marsh Barton" or "EX2" references:
```bash
grep -r "Marsh Barton\|EX2 8" app/ --include="*.tsx" --include="*.ts"
```
Fix anything remaining.

**Step 4:** Final commit if any stragglers fixed:
```bash
git add -A
git commit -m "fix: remove remaining old address references"
```
