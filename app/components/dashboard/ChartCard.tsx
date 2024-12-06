interface ChartCardProps {
  title: string
  children: React.ReactNode
}

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-black/50 border border-[#3E797F]/30 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        {children}
      </div>
    </div>
  )
} 