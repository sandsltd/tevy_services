import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  Timestamp 
} from 'firebase/firestore'

export async function GET() {
  try {
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const quotesRef = collection(db, 'quotes')

    // Get all quotes
    const quotesSnapshot = await getDocs(quotesRef)
    const totalQuotes = quotesSnapshot.size

    // Get this month's quotes
    const monthlyQuotesQuery = query(
      quotesRef,
      where('createdAt', '>=', Timestamp.fromDate(firstDayOfMonth))
    )
    const monthlyQuotesSnapshot = await getDocs(monthlyQuotesQuery)
    const monthlyQuotes = monthlyQuotesSnapshot.size

    // Process quotes for analytics
    const serviceBreakdown: Record<string, number> = {}
    const locationData: Record<string, number> = {}

    quotesSnapshot.forEach((doc) => {
      const data = doc.data()
      
      // Service breakdown
      serviceBreakdown[data.service] = (serviceBreakdown[data.service] || 0) + 1
      
      // Location data
      locationData[data.location] = (locationData[data.location] || 0) + 1
    })

    return NextResponse.json({
      totalQuotes,
      quotesThisMonth: monthlyQuotes,
      
      serviceTypeBreakdown: serviceBreakdown,

      locationHeatmap: Object.entries(locationData).map(([name, value]) => ({
        name,
        value
      })),

      // Keep some mock data for now
      revenueMetrics: {
        thisMonth: 12500,
        lastMonth: 11000,
        growth: 13.6,
      },
      servicePreferences: {
        mobile: 60,
        workshop: 40,
      },
      customerStats: {
        totalCustomers: totalQuotes,
        returningCustomers: 0,
        averageRating: 4.8,
      }
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
} 