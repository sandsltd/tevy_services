'use client'
import { useEffect, useState } from 'react'
import { 
  BarChart, 
  LineChart, 
  PieChart,
  ResponsiveContainer, 
  Area,
  AreaChart,
  XAxis, 
  YAxis, 
  Tooltip,
  Line,
  Bar,
  Pie
} from 'recharts'
import { 
  Users, 
  TrendingUp, 
  Star, 
  MapPin,
  Car,
  Wrench,
  PoundSterling,
  Calendar
} from 'lucide-react'
import LoadingSkeleton from '../components/dashboard/LoadingSkeleton'
import QuickStatCard from '../components/dashboard/QuickStatCard'
import ChartCard from '../components/dashboard/ChartCard'
import { transformServiceData, transformPreferenceData, transformCustomerData } from '../utils/chartTransformers'
import FirebaseTest from '../components/FirebaseTest'

// Add mock revenue data
const revenueData = [
  { name: 'Jan', value: 8500 },
  { name: 'Feb', value: 9200 },
  { name: 'Mar', value: 10500 },
  { name: 'Apr', value: 11000 },
  { name: 'May', value: 11800 },
  { name: 'Jun', value: 12500 }
]

interface Analytics {
  totalQuotes: number
  quotesThisMonth: number
  serviceTypeBreakdown: Record<string, number>
  locationHeatmap: Array<{ name: string; value: number }>
  revenueMetrics: {
    thisMonth: number
    lastMonth: number
    growth: number
  }
  servicePreferences: {
    mobile: number
    workshop: number
  }
  customerStats: {
    totalCustomers: number
    returningCustomers: number
    averageRating: number
  }
}

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics')
        const data = await response.json()
        
        if (!data) {
          throw new Error('No data received')
        }
        
        setAnalytics(data)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        setError('Failed to load analytics data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

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
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickStatCard
          title="Total Quotes"
          value={analytics.totalQuotes}
          icon={<Calendar />}
          trend={+15}
        />
        <QuickStatCard
          title="Revenue This Month"
          value={`£${analytics.revenueMetrics?.thisMonth || 0}`}
          icon={<PoundSterling />}
          trend={analytics.revenueMetrics?.growth || 0}
        />
        <QuickStatCard
          title="Customer Rating"
          value={analytics.customerStats?.averageRating || 0}
          icon={<Star />}
          suffix="/5"
        />
        <QuickStatCard
          title="Total Customers"
          value={analytics.customerStats?.totalCustomers || 0}
          icon={<Users />}
          trend={+8}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Service Type Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={transformServiceData(analytics?.serviceTypeBreakdown)}
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
        <ChartCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3E797F" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Location Heat Map */}
      <div className="mb-8">
        <ChartCard title="Service Areas">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics?.locationHeatmap}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3E797F" 
                fill="#3E797F" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Service Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Service Type Preferences">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformPreferenceData(analytics?.servicePreferences)}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3E797F" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Customer Return Rate">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={transformCustomerData(analytics?.customerStats)}
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
      </div>

      <FirebaseTest />
    </div>
  )
} 