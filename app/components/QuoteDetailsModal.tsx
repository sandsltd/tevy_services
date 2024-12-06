import { format } from 'date-fns'
import { Quote } from '../types/quote'

interface QuoteDetailsModalProps {
  quote: Quote | null
  onClose: () => void
  onStatusChange?: (quoteId: string, newStatus: Quote['status']) => void
}

export default function QuoteDetailsModal({ quote, onClose, onStatusChange }: QuoteDetailsModalProps) {
  if (!quote) return null

  // Debug logging
  console.log('Quote data:', {
    id: quote.id,
    wheelDetails: quote.wheelDetails,
    wheelCount: quote.wheelCount,
    tyreDetails: quote.tyreDetails,
    serviceTypes: quote.serviceTypes,
    service: quote.service,
    preferredContact: quote.preferredContact,
    notes: quote.notes,
    createdAt: quote.createdAt,
    submittedAt: quote.submittedAt
  })

  // Debug logging
  console.log('Full quote data:', JSON.stringify(quote, null, 2))
  console.log('Quote details:', {
    wheelCount: quote.wheelCount,
    wheelSize: quote.wheelSize,
    tyreDetails: quote.tyreDetails,
    preferredContact: quote.preferredContact,
    service: quote.service,
    serviceTypes: quote.serviceTypes,
    hasPhotos: quote.hasPhotos,
    photoCount: quote.photoCount
  })

  const statusOptions: Quote['status'][] = ['pending', 'contacted', 'completed', 'cancelled']

  const formatValue = (value: any) => {
    if (value === undefined || value === null || value === '') {
      return 'Not specified'
    }
    return value
  }

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="border-t border-[#3E797F]/30 pt-4">
      <h3 className="text-lg font-medium mb-4 text-[#3E797F]">{title}</h3>
      {children}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#1A1A1A] border border-[#3E797F]/30 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header with Status Controls */}
        <div className="sticky top-0 bg-[#1A1A1A] border-b border-[#3E797F]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-[#3E797F]">Quote Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Status Controls */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-400">Status:</span>
            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange?.(quote.id, status)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    quote.status === status
                      ? 'bg-[#3E797F] text-white'
                      : 'bg-[#3E797F]/10 text-gray-300 hover:bg-[#3E797F]/20'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <Section title="Customer Information">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400">Name</label>
                <div className="mt-1 text-white text-lg">{quote.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Date Submitted</label>
                <div className="mt-1 text-white text-lg">
                  {format(new Date(quote.submittedAt || quote.createdAt), 'PPpp')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Email</label>
                <a href={`mailto:${quote.email}`} className="mt-1 text-[#3E797F] hover:underline block text-lg">
                  {quote.email}
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Phone</label>
                <a href={`tel:${quote.phone}`} className="mt-1 text-[#3E797F] hover:underline block text-lg">
                  {quote.phone}
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Preferred Contact Method</label>
                <div className="mt-1 text-white capitalize text-lg">{formatValue(quote.preferredContact)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Location</label>
                <div className="mt-1 text-white text-lg">{quote.location}</div>
              </div>
            </div>
          </Section>

          {/* Service Information */}
          <Section title="Service Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Service Type</label>
                <div className="mt-1 text-white capitalize text-lg">{formatValue(quote.service)}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400">Services Requested</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quote.serviceTypes.map((type, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#3E797F]/10 border border-[#3E797F]/30 rounded-md text-white"
                    >
                      {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Wheel Service Details */}
          <Section title="Wheel Service Details">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400">Number of Wheels</label>
                <div className="mt-1 text-white text-lg">{formatValue(quote.wheelCount)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Wheel Size</label>
                <div className="mt-1 text-white text-lg">{formatValue(quote.wheelDetails?.size)}</div>
              </div>
              {quote.wheelDetails?.paintColor && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400">Paint Color</label>
                  <div className="mt-1 text-white text-lg">{formatValue(quote.wheelDetails.paintColor)}</div>
                </div>
              )}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-400">Photos</label>
                <div className="mt-1 text-white text-lg">
                  {quote.hasPhotos 
                    ? `Yes (${quote.photoCount} photos)` 
                    : 'No - Photos to be provided later'}
                </div>
              </div>
            </div>
          </Section>

          {/* Tyre Service Details */}
          <Section title="Tyre Service Details">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400">Vehicle Type</label>
                <div className="mt-1 text-white capitalize text-lg">{formatValue(quote.tyreDetails?.vehicleType)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Number of Tyres</label>
                <div className="mt-1 text-white text-lg">{formatValue(quote.tyreDetails?.tyreCount)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Tyre Size</label>
                <div className="mt-1 text-white text-lg">{formatValue(quote.tyreDetails?.tyreSize)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Service Type</label>
                <div className="mt-1 text-white text-lg">
                  {quote.tyreDetails?.wheelsOnly !== undefined 
                    ? (quote.tyreDetails.wheelsOnly ? 'Wheels Only' : 'Full Vehicle Service')
                    : 'Not specified'}
                </div>
              </div>
              {quote.tyreDetails?.currentTyres && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400">Notes about tyres</label>
                  <div className="mt-1 text-white text-lg whitespace-pre-wrap">{quote.tyreDetails.currentTyres}</div>
                </div>
              )}
              {quote.tyreDetails?.preferredBrands && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400">Preferred Tyre Brands</label>
                  <div className="mt-1 text-white text-lg whitespace-pre-wrap">{quote.tyreDetails.preferredBrands}</div>
                </div>
              )}
            </div>
          </Section>

          {/* Additional Notes */}
          {quote.notes && (
            <Section title="Additional Notes">
              <div className="text-white text-lg whitespace-pre-wrap">{quote.notes}</div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
} 