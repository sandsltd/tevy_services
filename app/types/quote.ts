export interface Quote {
  id: string
  name: string
  email: string
  phone: string
  location: string
  service: string
  serviceTypes: string[]
  createdAt: Date
  status: 'pending' | 'contacted' | 'completed' | 'cancelled'
  notes?: string
  wheelCount?: number
  wheelSize?: string
  preferredContact?: 'email' | 'phone'
  tyreDetails?: {
    vehicleType: 'car' | 'van' | 'motorbike'
    tyreCount: number
    tyreSize?: string
    wheelsOnly?: boolean
    currentTyres?: string
    preferredBrands?: string
  }
  wheelDetails?: {
    size?: string
    paintColor?: string
  }
  hasPhotos?: boolean
  photoCount?: number
  distance?: number
  submittedAt?: string
} 