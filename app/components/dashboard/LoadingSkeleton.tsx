export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-6">
      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-black/50 border border-[#3E797F]/30 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-[#3E797F]/20 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-[#3E797F]/20 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-black/50 border border-[#3E797F]/30 rounded-xl p-6 h-[300px] animate-pulse">
            <div className="h-4 bg-[#3E797F]/20 rounded w-1/3 mb-4"></div>
            <div className="h-full bg-[#3E797F]/10 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
} 