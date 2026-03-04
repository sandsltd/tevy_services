# Design: Address Update & "We've Moved" Banner

**Date:** 2026-03-04

## Summary

Two changes: update the business address across the site from Marsh Barton, Exeter to the new Ipplepen location, and add a dismissible top banner notifying visitors of the move.

## New Address

Unit 2, Quicks Units, Buttlands Industrial Estate, Totnes Road, Ipplepen, TQ12 5UE

## 1. "We've Moved" Banner

**Component:** `app/components/MovedBanner.tsx` (client component)

- Full-width amber/yellow strip rendered at the top of every page
- Message: "📍 We've moved! Our new address is Unit 2, Quicks Units, Buttlands Industrial Estate, Totnes Road, Ipplepen, TQ12 5UE"
- Close (×) button dismisses the banner and sets `localStorage` key `moved-banner-dismissed=true`
- On mount, checks localStorage — if key is set, banner does not render
- Inserted into `app/layout.tsx` above `{children}`

## 2. Address Updates

Replace all references to the old Marsh Barton address with the new Ipplepen address across:

- `app/components/Footer.tsx`
- `app/components/LocalBusinessSchema.tsx`
- `app/contact/page.tsx`
- `app/services/tpms/page.tsx`
- `app/services/tyre-replacement/page.tsx`
- `app/services/tyre-repair/page.tsx`
- `app/services/painted-alloys/page.tsx`
- `app/locations/newton-abbot/page.tsx`
- `app/locations/torquay/page.tsx`
- `app/page.tsx`
- `app/puncture-repairs/page.tsx`
- `app/mobile-alloy-wheel-refurbishment/page.tsx`
- `app/layout.tsx` (meta description)
- `app/components/CoverageMap.tsx` (workshop reference text)
- `app/components/ServiceBooking.tsx` (description text)

Meta descriptions referencing "Marsh Barton" will be updated to remove or replace that reference with the new location.
