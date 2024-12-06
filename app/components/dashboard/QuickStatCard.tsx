import { TrendingUp, TrendingDown } from 'lucide-react'

interface QuickStatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  trend?: number
  suffix?: string
}

export default function QuickStatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  suffix = '' 
}: QuickStatCardProps) {
  return (
    <div className="bg-black/50 border border-[#3E797F]/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <div className="text-[#3E797F]">{icon}</div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold">
          {value}{suffix}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="ml-1 text-sm">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  )
} 