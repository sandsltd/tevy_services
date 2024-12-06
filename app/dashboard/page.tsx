'use client'
import { useEffect, useState } from 'react'
import { 
  BarChart, 
  LineChart, 
  PieChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Line,
  Bar,
  Pie
} from 'recharts'
import { 
  Users, 
  Calendar,
  MapPin,
  Activity
} from 'lucide-react'
import LoadingSkeleton from '../components/dashboard/LoadingSkeleton'
import QuickStatCard from '../components/dashboard/QuickStatCard'
import ChartCard from '../components/dashboard/ChartCard'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, Timestamp, limit, doc, updateDoc } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import { format } from 'date-fns'
import { Quote } from '../types/quote'
import QuoteDetailsModal from '../components/QuoteDetailsModal'

interface DashboardAnalytics {
  totalQuotes: number
  quotesThisMonth: number
  serviceTypeBreakdown: {
    [key: string]: number
  }
  locationBreakdown: {
    location: string
    count: number
  }[]
  conversionMetrics: {
    totalVisitors: number
    quoteRequests: number
    conversionRate: number
  }
  servicePreferences: {
    mobile: number
    workshop: number
    collection: number
  }
  vehicleTypes: {
    car: number
    van: number
    motorbike: number
  }
  specificServices: {
    'diamond-cut': number
    'painted': number
    'tyre-replacement': number
    'tyre-repair': number
    'tpms': number
  }
  wheelCounts: {
    [key: string]: number
  }
  quotes: Quote[]
}

const StatusBadge = ({ status }: { status: Quote['status'] }) => {
  const colors = {
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    contacted: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completed: 'bg-green-500/10 text-green-500 border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20'
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<DashboardAnalytics>({
    totalQuotes: 0,
    quotesThisMonth: 0,
    serviceTypeBreakdown: {},
    locationBreakdown: [],
    conversionMetrics: {
      totalVisitors: 0,
      quoteRequests: 0,
      conversionRate: 0
    },
    servicePreferences: {
      mobile: 0,
      workshop: 0,
      collection: 0
    },
    vehicleTypes: {
      car: 0,
      van: 0,
      motorbike: 0
    },
    specificServices: {
      'diamond-cut': 0,
      'painted': 0,
      'tyre-replacement': 0,
      'tyre-repair': 0,
      'tpms': 0
    },
    wheelCounts: {},
    quotes: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState('month') // 'week', 'month', 'year'
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Get date range
        const now = new Date()
        let startDate = new Date()
        if (dateRange === 'week') {
          startDate.setDate(now.getDate() - 7)
        } else if (dateRange === 'month') {
          startDate.setMonth(now.getMonth() - 1)
        } else {
          startDate.setFullYear(now.getFullYear() - 1)
        }

        // Query quotes collection
        const quotesRef = collection(db, 'quotes')
        const dateQuery = query(
          quotesRef,
          where('createdAt', '>=', Timestamp.fromDate(startDate))
        )
        const querySnapshot = await getDocs(dateQuery)

        console.log('Found quotes:', querySnapshot.size)

        // Process quotes data
        const serviceTypes: Record<string, number> = {}
        const locations: Record<string, number> = {}
        let mobileCount = 0
        let workshopCount = 0
        let collectionCount = 0
        
        // Initialize tracking objects
        const wheelCounts: Record<string, number> = {}
        const vehicleTypes = {
          car: 0,
          van: 0,
          motorbike: 0
        }
        const specificServices = {
          'diamond-cut': 0,
          'painted': 0,
          'tyre-replacement': 0,
          'tyre-repair': 0,
          'tpms': 0
        }

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          console.log('Processing quote:', doc.id, data)
          
          // Service type breakdown
          if (data.serviceTypes && Array.isArray(data.serviceTypes)) {
            data.serviceTypes.forEach((type: string) => {
              serviceTypes[type] = (serviceTypes[type] || 0) + 1
            })
          } else {
            console.warn('Quote missing serviceTypes:', doc.id)
          }

          // Location breakdown
          if (data.location) {
            const location = data.location.split(',')[0] // Get first part of location
            locations[location] = (locations[location] || 0) + 1
          } else {
            console.warn('Quote missing location:', doc.id)
          }

          // Service preferences
          if (data.service) {
            if (data.service === 'mobile') mobileCount++
            if (data.service === 'workshop') workshopCount++
            if (data.service === 'collection') collectionCount++
          } else {
            console.warn('Quote missing service type:', doc.id)
          }
        })

        console.log('Processed data:', {
          serviceTypes,
          locations,
          mobileCount,
          workshopCount,
          collectionCount
        })

        // Calculate this month's quotes
        const thisMonth = new Date()
        thisMonth.setDate(1)
        const monthQuery = query(
          quotesRef,
          where('createdAt', '>=', Timestamp.fromDate(thisMonth))
        )
        const monthSnapshot = await getDocs(monthQuery)

        // Get quotes with their IDs
        const quotes: Quote[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          quotes.push({
            id: doc.id,
            name: data.name || 'N/A',
            email: data.email || 'N/A',
            phone: data.phone || 'N/A',
            location: data.location || 'N/A',
            service: data.service || 'N/A',
            serviceTypes: data.serviceTypes || [],
            createdAt: data.createdAt?.toDate() || new Date(),
            status: data.status || 'pending',
            notes: data.notes,
            wheelCount: data.wheelCount,
            wheelSize: data.wheelSize,
            preferredContact: data.preferredContact,
            tyreDetails: data.tyreDetails ? {
              vehicleType: data.tyreDetails.vehicleType,
              tyreCount: data.tyreDetails.tyreCount,
              tyreSize: data.tyreDetails.tyreSize,
              wheelsOnly: data.tyreDetails.wheelsOnly,
              currentTyres: data.tyreDetails.currentTyres,
              preferredBrands: data.tyreDetails.preferredBrands
            } : undefined,
            hasPhotos: data.hasPhotos,
            photoCount: data.photoCount,
            distance: data.distance,
            submittedAt: data.submittedAt
          })
        })

        quotes.forEach(quote => {
          // Service type counts
          if (quote.service === 'mobile') mobileCount++
          if (quote.service === 'workshop') workshopCount++
          if (quote.service === 'collection') collectionCount++

          // Location breakdown
          if (quote.location) {
            locations[quote.location] = (locations[quote.location] || 0) + 1
          }

          // Service types breakdown
          quote.serviceTypes?.forEach(type => {
            serviceTypes[type] = (serviceTypes[type] || 0) + 1
            if (type in specificServices) {
              specificServices[type as keyof typeof specificServices]++
            }
          })

          // Wheel counts
          if (quote.wheelCount) {
            wheelCounts[quote.wheelCount] = (wheelCounts[quote.wheelCount] || 0) + 1
          }

          // Vehicle types
          if (quote.tyreDetails?.vehicleType) {
            vehicleTypes[quote.tyreDetails.vehicleType as keyof typeof vehicleTypes]++
          }
        })

        setAnalytics({
          totalQuotes: querySnapshot.size,
          quotesThisMonth: monthSnapshot.size,
          serviceTypeBreakdown: serviceTypes,
          locationBreakdown: Object.entries(locations).map(([name, value]) => ({
            location: name,
            count: value
          })),
          conversionMetrics: {
            totalVisitors: querySnapshot.size * 5,
            quoteRequests: querySnapshot.size,
            conversionRate: 20
          },
          servicePreferences: {
            mobile: mobileCount,
            workshop: workshopCount,
            collection: collectionCount
          },
          vehicleTypes,
          specificServices,
          wheelCounts,
          quotes: quotes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        })
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        setError(error instanceof Error ? error.message : 'Failed to load analytics data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [dateRange])

  const handleStatusChange = async (quoteId: string, newStatus: Quote['status']) => {
    try {
      const quoteRef = doc(db, 'quotes', quoteId)
      await updateDoc(quoteRef, { status: newStatus })
      
      // Update local state
      setAnalytics(prev => ({
        ...prev,
        quotes: prev.quotes.map(quote => 
          quote.id === quoteId ? { ...quote, status: newStatus } : quote
        )
      }))
    } catch (error) {
      console.error('Error updating quote status:', error)
      alert('Failed to update quote status. Please try again.')
    }
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  // Ensure we have analytics data before rendering
  if (!analytics) {
    return <LoadingSkeleton />
  }

  return (
    <div className="container mx-auto p-6">
      {/* Date Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-lg border border-[#3E797F]/30 p-1">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium capitalize
                ${dateRange === range 
                  ? 'bg-[#3E797F] text-white' 
                  : 'text-gray-400 hover:text-white'
                }
              `}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickStatCard
          title="Total Quotes"
          value={analytics?.totalQuotes || 0}
          icon={<Calendar />}
        />
        <QuickStatCard
          title="Quotes This Month"
          value={analytics?.quotesThisMonth || 0}
          icon={<Activity />}
        />
        <QuickStatCard
          title="Conversion Rate"
          value={`${analytics?.conversionMetrics.conversionRate || 0}%`}
          icon={<Users />}
        />
        <QuickStatCard
          title="Locations"
          value={analytics?.locationBreakdown.length || 0}
          icon={<MapPin />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Service Type Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(analytics?.serviceTypeBreakdown || {}).map(([name, value]) => ({
                  name,
                  value
                }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#3E797F"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Location Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics?.locationBreakdown || []}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3E797F" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quotes Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Quotes</h2>
        <div className="bg-black/20 rounded-lg border border-[#3E797F]/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3E797F]/30">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3E797F]/30">
                {analytics.quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-[#3E797F]/5">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {format(quote.createdAt, 'dd MMM yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{quote.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>
                        <a href={`mailto:${quote.email}`} className="text-[#3E797F] hover:underline">
                          {quote.email}
                        </a>
                      </div>
                      <div className="text-gray-400">
                        <a href={`tel:${quote.phone}`} className="hover:text-white">
                          {quote.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{quote.location}</td>
                    <td className="px-6 py-4 text-sm">
                      <div>{quote.service}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {quote.serviceTypes.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => setSelectedQuote(quote)}
                        className="text-[#3E797F] hover:text-white"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add the modal */}
      <QuoteDetailsModal
        quote={selectedQuote}
        onClose={() => setSelectedQuote(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
} 