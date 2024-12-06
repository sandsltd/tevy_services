'use client'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      // Call the sign out endpoint
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        // Also clear client-side cookie
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        
        // Force a hard navigation
        window.location.href = '/login'
      } else {
        console.error('Failed to sign out')
      }
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black/90 border-b border-[#3E797F]/30 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <span className="text-[#3E797F]">TEVY</span> Dashboard
          </h1>
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-[#3E797F]/10 hover:bg-[#3E797F]/20 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>
      {children}
    </div>
  )
} 