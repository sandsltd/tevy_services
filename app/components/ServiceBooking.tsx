'use client'
import { useState, useEffect, useRef } from 'react'
import { X, ChevronRight, Car, Wrench, HelpCircle } from 'lucide-react'
import imageCompression from 'browser-image-compression';
import Image from 'next/image'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'

interface ServiceBookingProps {
  location: string
  distance: number
  serviceTypes: ('mobile' | 'wheel-collection' | 'outside')[]
  onClose: () => void
}

type ServiceType = 'mobile' | 'collection' | 'workshop'
type ServiceDetails = {
  wheelCount: number
  serviceTypes: string[]
  preferredDate?: Date
  tyreDetails?: TyreDetails
  wheelSize?: string
  paintColor?: string
}

type VehicleType = 'car' | 'van' | 'motorbike'
type TyreDetails = {
  vehicleType: VehicleType
  tyreCount: number
  tyreSize?: string
  wheelsOnly?: boolean // Only for workshop service
  currentTyres?: string // Optional info about current tyres
  preferredBrands?: string // Optional brand preferences
}

type StepType = 'service-type' | 'service-selection' | 'wheel-service' | 'tyre-service' | 'photos' | 'contact'

interface ServiceStep {
  id: number
  type: StepType
  title: string
  optional?: boolean
  requiredFor?: string[]
}

const Tooltip = ({ 
  id, 
  activeTooltip,
  children 
}: { 
  id: string
  activeTooltip: string | null
  children: React.ReactNode 
}) => (
  <div 
    className={`
      absolute z-10 left-6 w-64 p-2 
      bg-black/90 text-xs text-gray-300 rounded-lg 
      border border-[#3E797F]/30 backdrop-blur-sm
      transition-all duration-200
      ${activeTooltip === id 
        ? 'opacity-100 -top-2 -translate-y-full' 
        : 'opacity-0 pointer-events-none top-0'
      }
    `}
  >
    {children}
  </div>
)

const HelpIcon = ({ 
  id, 
  activeTooltip,
  setActiveTooltip,
  children 
}: { 
  id: string
  activeTooltip: string | null
  setActiveTooltip: (id: string | null) => void
  children: React.ReactNode 
}) => (
  <div className="relative">
    <button
      onClick={(e) => {
        e.preventDefault()
        setActiveTooltip(activeTooltip === id ? null : id)
      }}
      className="p-1 -m-1 rounded-full hover:bg-white/10"
    >
      <HelpCircle className="w-4 h-4 text-[#3E797F]" />
    </button>
    <Tooltip id={id} activeTooltip={activeTooltip}>{children}</Tooltip>
  </div>
)

const STEPS = [
  { id: 1, title: 'Service Type' },
  { id: 2, title: 'Service Details' },
  { id: 3, title: 'Photos', optional: true },
  { id: 4, title: 'Contact Details' }
]

// Dynamic step generation based on selected services
const getRequiredSteps = (selectedServices: string[]): ServiceStep[] => {
  const steps: ServiceStep[] = [
    { id: 1, type: 'service-type' as StepType, title: 'Service Type' },
    { id: 2, type: 'service-selection' as StepType, title: 'Select Services' }
  ]

  const hasWheelServices = selectedServices.some(s => ['diamond-cut', 'painted'].includes(s))
  const hasTyreServices = selectedServices.some(s => ['tyre-replacement', 'tyre-repair', 'tpms'].includes(s))

  if (hasWheelServices) {
    steps.push({ 
      id: steps.length + 1, 
      type: 'wheel-service' as StepType, 
      title: 'Wheel Details'
    })
  }

  if (hasTyreServices) {
    steps.push({ 
      id: steps.length + 1, 
      type: 'tyre-service' as StepType, 
      title: 'Tyre Details'
    })
  }

  if (hasWheelServices) {
    steps.push({ 
      id: steps.length + 1, 
      type: 'photos' as StepType, 
      title: 'Photos', 
      optional: true
    })
  }

  steps.push({ 
    id: steps.length + 1, 
    type: 'contact' as StepType, 
    title: 'Contact Details' 
  })

  return steps
}

// Add these constants at the top of the file
const MAX_PHOTO_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_PHOTO_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/heic', // Common iPhone format
  'image/heif'  // Common iPhone format
]

// Add this helper function
const validatePhoto = (file: File): { valid: boolean; error?: string } => {
  if (file.size > MAX_PHOTO_SIZE) {
    return {
      valid: false,
      error: 'Photo must be smaller than 10MB'
    }
  }

  if (!ALLOWED_PHOTO_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Please upload a JPG, PNG, or HEIC photo'
    }
  }

  return { valid: true }
}

// Add compression options
const compressionOptions = {
  maxSizeMB: 1,      // Max file size in MB
  maxWidthOrHeight: 1920, // Max width/height in pixels
  useWebWorker: true // Use web workers for better performance
}

interface QuoteData {
  location: string
  distance: number
  service: string
  wheelCount: number
  wheelSize?: string
  name: string
  email: string
  phone: string
  notes?: string
  preferredContact?: string
}

export default function ServiceBooking({ 
  location, 
  distance, 
  serviceTypes, 
  onClose 
}: ServiceBookingProps) {
  const [step, setStep] = useState(1)
  const [serviceType, setServiceType] = useState<ServiceType>()
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    wheelCount: 4,
    serviceTypes: []
  })
  const [wheelPhotos, setWheelPhotos] = useState<File[]>([])
  const [noPhotosReason, setNoPhotosReason] = useState<string>('')
  const [tyreDetails, setTyreDetails] = useState<TyreDetails>({
    vehicleType: 'car',
    tyreCount: 4
  })
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [activeSteps, setActiveSteps] = useState<ServiceStep[]>(getRequiredSteps([]))
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    preferredContact: 'email' as 'email' | 'phone'
  })
  const [submissionStatus, setSubmissionStatus] = useState({
    stage: 'idle' as 'idle' | 'compressing' | 'uploading' | 'sending' | 'complete',
    progress: 0
  })

  const canGoBack = step > 1
  const currentStepIndex = step - 1

  // Add this ref for the content container
  const contentRef = useRef<HTMLDivElement>(null)

  // Add this effect to handle scrolling when steps change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0)
    }
  }, [currentStepIndex])

  useEffect(() => {
    // Reset form error when changing steps
    setFormError(null)
  }, [step])

  useEffect(() => {
    // When going back to service type selection, reset everything
    if (step === 1) {
      setServiceType(undefined)
      setServiceDetails({
        wheelCount: 4,
        serviceTypes: []
      })
      setTyreDetails({
        vehicleType: 'car',
        tyreCount: 4
      })
      setWheelPhotos([])
      setNoPhotosReason('')
      setActiveSteps(getRequiredSteps([]))
    }

    // When going back to service selection, keep service type but reset details
    if (step === 2) {
      setServiceDetails(prev => ({
        ...prev,
        serviceTypes: []
      }))
      setTyreDetails({
        vehicleType: 'car',
        tyreCount: 4
      })
      setWheelPhotos([])
      setNoPhotosReason('')
    }

    // Track completed steps to prevent data loss
    const completedSteps = new Set<number>()
    activeSteps.forEach((s, i) => {
      if (i < currentStepIndex) {
        completedSteps.add(s.id)
      }
    })
  }, [step, activeSteps])

  useEffect(() => {
    if (serviceType) {
      // Reset service selections when changing service type
      setServiceDetails(prev => ({
        ...prev,
        serviceTypes: []
      }))
    }
  }, [serviceType])

  const getServiceOptions = () => {
    const options = [
      {
        id: 'workshop',
        title: 'Come To Our Workshop',
        description: 'Full service range including wheel refurbishment, tyres and TPMS at our Marsh Barton workshop',
        icon: Car,
        available: true
      }
    ]

    if (serviceTypes.includes('mobile')) {
      options.push({
        id: 'mobile',
        title: 'Mobile Service',
        description: 'Diamond cut wheel repair and custom painting at your location',
        icon: Wrench,
        available: true
      })
    }

    if (serviceTypes.includes('wheel-collection')) {
      options.push({
        id: 'collection',
        title: 'Collection Service',
        description: 'We collect and return for wheel refurbishment and tyre services',
        icon: Car,
        available: true
      })
    }

    return options
  }

  const getAvailableServices = () => {
    const services = []

    if (serviceType === 'workshop') {
      services.push(
        { id: 'diamond-cut', label: 'Diamond Cut Alloy Wheel Refurbishment' },
        { id: 'painted', label: 'Painted Alloys & Colour Changes' },
        { id: 'tyre-replacement', label: 'Tyre Replacement' },
        { id: 'tyre-repair', label: 'Puncture Repairs' },
        { id: 'tpms', label: 'TPMS Service & Diagnostic' }
      )
    }

    if (serviceType === 'mobile' && serviceTypes.includes('mobile')) {
      services.push(
        { id: 'diamond-cut', label: 'Diamond Cut Alloy Wheel Refurbishment' },
        { id: 'painted', label: 'Painted Alloys & Colour Changes' }
      )
    }

    if (serviceType === 'collection' && serviceTypes.includes('wheel-collection')) {
      services.push(
        { id: 'diamond-cut', label: 'Diamond Cut Alloy Wheel Refurbishment' },
        { id: 'painted', label: 'Painted Alloys & Colour Changes' },
        { id: 'tyre-replacement', label: 'Tyre Replacement' },
        { id: 'tyre-repair', label: 'Puncture Repairs' }
      )
    }

    return services
  }

  const needsPhotos = serviceDetails.serviceTypes.some(type => 
    ['diamond-cut', 'painted'].includes(type)
  )

  const renderStep = () => {
    const currentStep = activeSteps[currentStepIndex]
    
    switch (currentStep.type) {
      case 'service-type':
        return renderServiceTypeStep()
      case 'service-selection':
        return renderServiceSelectionStep()
      case 'wheel-service':
        return renderWheelServiceStep()
      case 'tyre-service':
        return renderTyreServiceStep()
      case 'photos':
        return renderPhotosStep()
      case 'contact':
        return renderContactStep()
    }
  }

  const renderServiceTypeStep = () => {
    return (
      <div>
        <h4 className="text-lg font-semibold mb-4">How would you like your service?</h4>
        <div className="space-y-3">
          {getServiceOptions().map((option) => (
            <button
              key={option.id}
              className={`
                w-full p-4 rounded-lg border text-left transition-colors
                ${serviceType === option.id
                  ? 'border-[#3E797F] bg-[#3E797F]/10'
                  : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                }
              `}
              onClick={() => {
                // Immediately set the service type without needing a second click
                setServiceType(option.id as ServiceType)
                const newSteps: ServiceStep[] = [
                  { id: 1, type: 'service-type', title: 'Service Type' },
                  { id: 2, type: 'service-selection', title: 'Select Services' }
                ]
                setActiveSteps(newSteps)
                setStep(2)
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#3E797F]/10 rounded-lg">
                    <option.icon className="w-5 h-5 text-[#3E797F]" />
                  </div>
                  <div>
                    <div className="font-medium">{option.title}</div>
                    <div className="text-sm text-gray-400">{option.description}</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  serviceType === option.id ? 'border-[#3E797F] bg-[#3E797F]/10' : 'border-[#3E797F]/30'
                }`}>
                  {serviceType === option.id && <div className="w-3 h-3 rounded-full bg-[#3E797F]" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderServiceSelectionStep = () => {
    return (
      <div className="space-y-4">
        <h4 className="font-semibold">Select Services</h4>
        <div className="space-y-3">
          {getAvailableServices().map((service) => (
            <button
              key={service.id}
              onClick={() => {
                const newServices = serviceDetails.serviceTypes.includes(service.id)
                  ? serviceDetails.serviceTypes.filter(type => type !== service.id)
                  : [...serviceDetails.serviceTypes, service.id]
                
                setServiceDetails(prev => ({ ...prev, serviceTypes: newServices }))
              }}
              className={`
                w-full p-3 rounded border text-left transition-colors
                ${serviceDetails.serviceTypes.includes(service.id)
                  ? 'border-[#3E797F] bg-[#3E797F]/10'
                  : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span>{service.label}</span>
                <div className={`
                  w-5 h-5 rounded border flex items-center justify-center
                  ${serviceDetails.serviceTypes.includes(service.id)
                    ? 'border-[#3E797F] bg-[#3E797F]/10'
                    : 'border-[#3E797F]/30'
                  }
                `}>
                  {serviceDetails.serviceTypes.includes(service.id) && (
                    <div className="w-3 h-3 rounded-full bg-[#3E797F]" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            // Get the next steps based on selected services
            const hasWheelServices = serviceDetails.serviceTypes.some(s => 
              ['diamond-cut', 'painted'].includes(s)
            )
            const hasTyreServices = serviceDetails.serviceTypes.some(s => 
              ['tyre-replacement', 'tyre-repair', 'tpms'].includes(s)
            )

            // Build steps array
            const newSteps: ServiceStep[] = [
              { id: 1, type: 'service-type' as StepType, title: 'Service Type' },
              { id: 2, type: 'service-selection' as StepType, title: 'Select Services' }
            ]

            if (hasWheelServices) {
              newSteps.push({
                id: newSteps.length + 1,
                type: 'wheel-service' as StepType,
                title: 'Wheel Details'
              })
            }

            if (hasTyreServices) {
              newSteps.push({
                id: newSteps.length + 1,
                type: 'tyre-service' as StepType,
                title: 'Tyre Details'
              })
            }

            if (hasWheelServices) {
              newSteps.push({
                id: newSteps.length + 1,
                type: 'photos' as StepType,
                title: 'Photos',
                optional: true
              })
            }

            newSteps.push({
              id: newSteps.length + 1,
              type: 'contact' as StepType,
              title: 'Contact Details'
            })

            setActiveSteps(newSteps)
            // Move to next relevant step
            const nextStep = hasWheelServices ? 'wheel-service' 
              : hasTyreServices ? 'tyre-service' 
              : 'contact'
            
            const nextStepIndex = newSteps.findIndex(s => s.type === nextStep) + 1
            setStep(nextStepIndex)
          }}
          disabled={serviceDetails.serviceTypes.length === 0}
          className={`
            w-full mt-4 px-4 py-3 rounded-lg font-semibold transition-colors
            ${serviceDetails.serviceTypes.length > 0
              ? 'bg-[#3E797F] hover:bg-[#3E797F]/80'
              : 'bg-gray-600 cursor-not-allowed'
            }
          `}
        >
          Continue
        </button>
      </div>
    )
  }

  const renderWheelServiceStep = () => {
    // Get the wheel services that were selected
    const selectedWheelServices = serviceDetails.serviceTypes
      .filter(s => ['diamond-cut', 'painted'].includes(s))
      .map(s => {
        if (s === 'diamond-cut') return 'Diamond Cut Refurbishment'
        if (s === 'painted') return 'Custom Painting'
        return s
      })
      .join(' & ')

    const hasPaintService = serviceDetails.serviceTypes.includes('painted')

    return (
      <div className="space-y-4">
        <h4 className="font-semibold">Wheel Refurbishment Details</h4>
        <div className="bg-[#3E797F]/10 border border-[#3E797F]/30 rounded-lg p-4">
          <p className="text-base font-medium text-white">
            Selected Services: {selectedWheelServices}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Help us provide an accurate quote for your wheels
          </p>
        </div>

        {/* Number of wheels */}
        <div>
          <label className="block text-base font-medium text-white mb-2">
            How many wheels need {selectedWheelServices}?
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setServiceDetails(prev => ({ ...prev, wheelCount: num }))}
                className={`
                  flex-1 py-2 rounded border transition-colors
                  ${serviceDetails.wheelCount === num
                    ? 'border-[#3E797F] bg-[#3E797F]/10'
                    : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Wheel Size */}
        <div>
          <label htmlFor="wheel-size" className="block text-base font-medium text-white mb-2 flex items-center gap-2">
            Wheel Size
            <HelpIcon 
              id="wheel-size" 
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
            >
              <p>Please specify your wheel size (e.g., 17", 18", 19", etc.)</p>
              <p className="mt-1 text-sm">You can usually find this:</p>
              <ul className="list-disc pl-4 mt-1 text-sm">
                <li>On the side of your current tyres</li>
                <li>In your vehicle handbook</li>
                <li>Inside your door frame</li>
              </ul>
            </HelpIcon>
          </label>
          <input
            id="wheel-size"
            type="text"
            placeholder={'e.g., 17"'}
            value={serviceDetails.wheelSize || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setServiceDetails(prev => ({ ...prev, wheelSize: e.target.value }));
            }}
            className="w-full px-4 py-2 bg-black/40 border border-[#3E797F]/30 rounded-lg focus:outline-none focus:border-[#3E797F]"
            required
          />
        </div>

        {/* Paint Color - Only show if painted service is selected */}
        {hasPaintService && (
          <div>
            <label htmlFor="paint-color" className="block text-base font-medium text-white mb-2 flex items-center gap-2">
              Desired Paint Color
              <HelpIcon 
                id="paint-color" 
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
              >
                <p>Please specify your desired paint color.</p>
                <p className="mt-1 text-sm">You can:</p>
                <ul className="list-disc pl-4 mt-1 text-sm">
                  <li>Specify an exact color code</li>
                  <li>Describe the color (e.g., "Gloss Black")</li>
                  <li>Request a match to your vehicle's color</li>
                </ul>
              </HelpIcon>
            </label>
            <input
              id="paint-color"
              type="text"
              placeholder="e.g., Gloss Black, Shadow Chrome, etc."
              value={serviceDetails.paintColor || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setServiceDetails(prev => ({ ...prev, paintColor: e.target.value }));
              }}
              className="w-full px-4 py-2 bg-black/40 border border-[#3E797F]/30 rounded-lg focus:outline-none focus:border-[#3E797F]"
              required
            />
          </div>
        )}

        <button
          onClick={() => {
            // Validate required fields
            if (!serviceDetails.wheelSize) {
              setFormError('Please specify your wheel size')
              return
            }
            if (hasPaintService && !serviceDetails.paintColor) {
              setFormError('Please specify your desired paint color')
              return
            }
            
            // Find the next step in the sequence
            const currentStepIndex = activeSteps.findIndex(s => s.type === 'wheel-service')
            const nextStep = activeSteps[currentStepIndex + 1]
            setStep(nextStep.id)
          }}
          className="w-full mt-4 px-4 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-semibold transition-colors"
        >
          Continue
        </button>
      </div>
    )
  }

  const renderTyreServiceStep = () => {
    // Get the tyre services that were selected
    const selectedTyreServices = serviceDetails.serviceTypes
      .filter(s => ['tyre-replacement', 'tyre-repair', 'tpms'].includes(s))
      .map(s => {
        if (s === 'tyre-replacement') return 'Tyre Replacement'
        if (s === 'tyre-repair') return 'Puncture Repair'
        if (s === 'tpms') return 'TPMS Service'
        return s
      })
      .join(' & ')

    const isWorkshop = serviceType === 'workshop'

    return (
      <div className="space-y-4">
        <h4 className="font-semibold">Tyre Service Details</h4>
        <div className="bg-[#3E797F]/10 border border-[#3E797F]/30 rounded-lg p-4">
          <p className="text-base font-medium text-white">
            Selected Services: {selectedTyreServices}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Help us provide an accurate quote for your tyres
          </p>
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-base font-medium text-white mb-2 flex items-center gap-2">
            Vehicle Type
            <HelpIcon 
              id="vehicle-type" 
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
            >
              <p>This helps us ensure we have the right equipment and tyres for your vehicle type:</p>
              <ul className="list-disc pl-4 mt-1">
                <li>Car: Standard passenger vehicles</li>
                <li>Van: Commercial vehicles up to 3.5t</li>
                <li>Motorbike: All motorcycle types</li>
              </ul>
            </HelpIcon>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['car', 'van', 'motorbike'].map((type) => (
              <button
                key={type}
                onClick={() => setTyreDetails(prev => ({ ...prev, vehicleType: type as VehicleType }))}
                className={`
                  py-2 rounded border transition-colors capitalize
                  ${tyreDetails.vehicleType === type
                    ? 'border-[#3E797F] bg-[#3E797F]/10'
                    : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Tyres */}
        <div>
          <label className="block text-base font-medium text-white mb-2">
            How many tyres need {selectedTyreServices.toLowerCase()}?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setTyreDetails(prev => ({ ...prev, tyreCount: num }))}
                className={`
                  py-2 rounded border transition-colors
                  ${tyreDetails.tyreCount === num
                    ? 'border-[#3E797F] bg-[#3E797F]/10'
                    : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Tyre Size */}
        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
            Tyre Size
            <HelpIcon 
              id="tyre-size" 
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
            >
              <p className="mb-1">You can find your tyre size:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>On the tyre sidewall (e.g., 225/45R17)</li>
                <li>Inside your driver's door frame</li>
                <li>In your vehicle handbook</li>
                <li>Don't worry if you can't find it - we can help!</li>
              </ul>
            </HelpIcon>
          </label>
          <input
            type="text"
            placeholder="Optional - We can check this for you"
            value={tyreDetails.tyreSize || ''}
            onChange={(e) => setTyreDetails(prev => ({ ...prev, tyreSize: e.target.value }))}
            className="w-full px-4 py-2 bg-black/40 border border-[#3E797F]/30 rounded-lg focus:outline-none focus:border-[#3E797F]"
          />
        </div>

        {/* Workshop-specific option */}
        {isWorkshop && (
          <div>
            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
              Service Type
              <HelpIcon 
                id="service-type" 
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
              >
                <p className="mb-1">Choose your preferred service option:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Wheels Only:</strong> Save time by just dropping off your wheels - perfect if you have a spare set or can arrange alternative transport</li>
                  <li><strong>Full Vehicle:</strong> We'll work on your vehicle directly - ideal if you need same-day service or don't have spare wheels</li>
                </ul>
              </HelpIcon>
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setTyreDetails(prev => ({ ...prev, wheelsOnly: true }))}
                className={`
                  w-full p-3 rounded border text-left transition-colors
                  ${tyreDetails.wheelsOnly
                    ? 'border-[#3E797F] bg-[#3E797F]/10'
                    : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Wheels Only</p>
                    <p className="text-sm text-gray-400">Drop off wheels for tyre fitting and collect later</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    tyreDetails.wheelsOnly ? 'border-[#3E797F] bg-[#3E797F]/10' : 'border-[#3E797F]/30'
                  }`}>
                    {tyreDetails.wheelsOnly && <div className="w-3 h-3 rounded-full bg-[#3E797F]" />}
                  </div>
                </div>
              </button>
              <button
                onClick={() => setTyreDetails(prev => ({ ...prev, wheelsOnly: false }))}
                className={`
                  w-full p-3 rounded border text-left transition-colors
                  ${tyreDetails.wheelsOnly === false
                    ? 'border-[#3E797F] bg-[#3E797F]/10'
                    : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Full Vehicle Service</p>
                    <p className="text-sm text-gray-400">Bring your vehicle for complete tyre fitting service</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    tyreDetails.wheelsOnly === false ? 'border-[#3E797F] bg-[#3E797F]/10' : 'border-[#3E797F]/30'
                  }`}>
                    {tyreDetails.wheelsOnly === false && <div className="w-3 h-3 rounded-full bg-[#3E797F]" />}
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Additional Notes */}
        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
            Additional Information
            <HelpIcon 
              id="additional-info" 
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
            >
              <p className="mb-1">Helpful information to include:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Current tyre brand and condition</li>
                <li>Any specific brand preferences</li>
                <li>Budget requirements</li>
                <li>Preferred appointment times</li>
                <li>Any damage or issues we should know about</li>
              </ul>
            </HelpIcon>
          </label>
          <textarea
            placeholder="Current tyre brand, preferred brands, or any other requirements..."
            className="w-full px-4 py-2 bg-black/40 border border-[#3E797F]/30 rounded-lg focus:outline-none focus:border-[#3E797F] h-24 resize-none"
            value={tyreDetails.currentTyres || ''}
            onChange={(e) => setTyreDetails(prev => ({ ...prev, currentTyres: e.target.value }))}
          />
        </div>

        <button
          onClick={() => {
            setServiceDetails(prev => ({ ...prev, tyreDetails }))
            
            // Find the next step in the sequence
            const currentStepIndex = activeSteps.findIndex(s => s.type === 'tyre-service')
            const nextStep = activeSteps[currentStepIndex + 1]
            setStep(nextStep.id)
          }}
          className="w-full mt-4 px-4 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-semibold transition-colors"
        >
          Continue
        </button>
      </div>
    )
  }

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files) return
    
    const newPhotos = Array.from(files)

    // Check if adding new photos would exceed the limit
    if (wheelPhotos.length + newPhotos.length > 6) {
      setFormError('Maximum 6 photos allowed')
      return
    }

    try {
      setIsSubmitting(true) // Show loading state while compressing

      // Process each photo
      const processedPhotos = await Promise.all(
        newPhotos.map(async (file) => {
          // Validate first
          const validation = validatePhoto(file)
          if (!validation.valid) {
            throw new Error(validation.error || 'Invalid photo')
          }

          // Compress the image
          const compressedFile = await imageCompression(file, compressionOptions)

          // Create a new File object with the original name
          return new File(
            [compressedFile], 
            file.name, 
            { type: compressedFile.type }
          )
        })
      )

      setWheelPhotos(prev => [...prev, ...processedPhotos])
      setFormError(null)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Error processing photos')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderPhotosStep = () => {
    return (
      <div className="space-y-4">
        <h4 className="font-semibold">Wheel Photos</h4>
        
        {wheelPhotos.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {wheelPhotos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-black/40">
                  <Image 
                    src={URL.createObjectURL(photo)}
                    alt={`Wheel ${index + 1}`}
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                  <button
                    onClick={() => {
                      setWheelPhotos(photos => photos.filter((_, i) => i !== index))
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {wheelPhotos.length < 6 && (
              <label className={`
                block w-full p-4 border-2 border-dashed border-[#3E797F]/30 
                rounded-lg hover:border-[#3E797F] transition-colors cursor-pointer 
                text-center relative
                ${isSubmitting ? 'opacity-50 cursor-wait' : ''}
              `}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(e.target.files)}
                  disabled={isSubmitting}
                />
                {isSubmitting ? (
                  <span className="text-base text-gray-300">
                    Optimizing photos...
                  </span>
                ) : (
                  <span className="text-base text-gray-300">
                    + Add More Photos ({6 - wheelPhotos.length} remaining)
                  </span>
                )}
              </label>
            )}

            <button
              onClick={() => {
                const currentStepIndex = activeSteps.findIndex(s => s.type === 'photos')
                const nextStep = activeSteps[currentStepIndex + 1]
                setStep(nextStep.id)
              }}
              className="w-full px-4 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-semibold transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Continue with ${wheelPhotos.length} photo${wheelPhotos.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block w-full p-8 border-2 border-dashed border-[#3E797F]/30 rounded-lg hover:border-[#3E797F] transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handlePhotoUpload(e.target.files)}
              />
              <div className="text-center">
                <div className="mt-2 text-base text-gray-300">
                  Click to upload photos or use your camera
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  JPG, PNG, or HEIC • Max 10MB per photo
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  You can add up to 6 photos
                </p>
              </div>
            </label>

            <div className="text-center">
              <button
                onClick={() => {
                  setNoPhotosReason('later')
                  const currentStepIndex = activeSteps.findIndex(s => s.type === 'photos')
                  const nextStep = activeSteps[currentStepIndex + 1]
                  setStep(nextStep.id)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                I'll send photos later
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderContactStep = () => {
    return (
      <div className="space-y-4 relative">
        {isSubmitting && <LoadingOverlay status={submissionStatus} />}
        <h4 className="font-semibold">Contact Details</h4>

        {formError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {formError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base font-medium text-white mb-2">Name</label>
            <input
              type="text"
              value={contactForm.name}
              onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-black/40 border border-[#3E797F]/30 rounded-lg focus:outline-none focus:border-[#3E797F]"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white mb-2">Email</label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 bg-black/40 border border-[#3E797F]/30 rounded-lg focus:outline-none focus:border-[#3E797F]"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white mb-2">Phone</label>
            <input
              type="tel"
              value={contactForm.phone}
              onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 bg-black/40 border border-[#3E797F]/30 rounded-lg focus:outline-none focus:border-[#3E797F]"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white mb-2">Preferred Contact Method</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setContactForm(prev => ({ ...prev, preferredContact: 'email' }))}
                className={`
                  flex-1 py-2 rounded border transition-colors
                  ${contactForm.preferredContact === 'email'
                    ? 'border-[#3E797F] bg-[#3E797F]/10'
                    : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                  }
                `}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setContactForm(prev => ({ ...prev, preferredContact: 'phone' }))}
                className={`
                  flex-1 py-2 rounded border transition-colors
                  ${contactForm.preferredContact === 'phone'
                    ? 'border-[#3E797F] bg-[#3E797F]/10'
                    : 'border-[#3E797F]/30 hover:border-[#3E797F] hover:bg-[#3E797F]/10'
                  }
                `}
              >
                Phone
              </button>
            </div>
          </div>
          <div>
            <label className="block text-base font-medium text-white mb-2">Additional Notes</label>
            <textarea
              value={contactForm.notes}
              onChange={(e) => setContactForm(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-4 py-2 bg-black/40 border border-[#3E797F]/30 rounded-lg focus:outline-none focus:border-[#3E797F] h-24 resize-none"
            />
          </div>

          {noPhotosReason === 'later' && (
            <div className="p-4 bg-[#3E797F]/10 border border-[#3E797F]/30 rounded-lg">
              <p className="text-sm text-gray-300">
                We noticed you haven't uploaded any photos yet - no worries! After submitting 
                your quote request, we'll send you an email with simple instructions for sharing 
                photos of your wheels. This will help us provide you with the most accurate quote 
                for your refurbishment.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full px-4 py-3 rounded-lg font-semibold transition-colors
              ${isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-[#3E797F] hover:bg-[#3E797F]/80'
              }
            `}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </button>
        </form>
      </div>
    )
  }

  const StepIndicator = () => (
    <div className="mb-6 px-2">
      <div className="flex items-center justify-between mb-2">
        {activeSteps.map((s, i) => (
          <div 
            key={s.id}
            className={`
              flex items-center
              ${i !== activeSteps.length - 1 ? 'flex-1' : ''}
            `}
          >
            <button
              onClick={() => {
                if (i < currentStepIndex) {
                  if (s.type === 'service-type' && serviceDetails.serviceTypes.length > 0) {
                    if (window.confirm('Going back will reset your service selections. Continue?')) {
                      setStep(s.id)
                    }
                    return
                  }
                  setStep(s.id)
                }
              }}
              disabled={i > currentStepIndex}
              className={`
                w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm
                transition-colors relative
                ${i <= currentStepIndex 
                  ? 'bg-[#3E797F] text-white' 
                  : 'bg-[#3E797F]/20 text-gray-400'
                }
                ${i < currentStepIndex 
                  ? 'cursor-pointer hover:bg-[#3E797F]/80' 
                  : ''
                }
              `}
            >
              {s.id}
              <span className="absolute -bottom-6 text-[10px] md:text-xs whitespace-nowrap text-gray-400 max-w-[60px] md:max-w-none truncate">
                {s.title}
                {s.optional && ' (Optional)'}
              </span>
            </button>
            {i !== activeSteps.length - 1 && (
              <div 
                className={`
                  h-[2px] flex-1 mx-1 md:mx-2
                  ${i < currentStepIndex 
                    ? 'bg-[#3E797F]' 
                    : 'bg-[#3E797F]/20'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  // Add validation functions
  const validateEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // UK phone number validation
    const pattern = /^(?:(?:\+44)|(?:0))(?:\d\s?){9,10}$/
    return pattern.test(phone.replace(/\s/g, ''))
  }

  // Add form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      console.log('Starting submission...')
      setIsSubmitting(true)
      setFormError(null)

      // Validate form data
      if (!validateEmail(contactForm.email)) {
        setFormError('Please enter a valid email address')
        return
      }

      if (!validatePhone(contactForm.phone)) {
        setFormError('Please enter a valid UK phone number')
        return
      }

      // Create quote data with default values for all fields
      const quoteData = { 
        // Location details
        location,
        distance,
        
        // Service details
        service: serviceType || '',
        serviceTypes: serviceDetails.serviceTypes || [],
        
        // Wheel details
        wheelCount: serviceDetails.wheelCount || 0,
        wheelDetails: {
          size: serviceDetails.wheelSize || '',
          paintColor: serviceDetails.paintColor || ''
        },
        
        // Tyre details
        tyreDetails: {
          vehicleType: tyreDetails.vehicleType || 'car',
          tyreCount: tyreDetails.tyreCount || 0,
          tyreSize: tyreDetails.tyreSize || '',
          wheelsOnly: tyreDetails.wheelsOnly || false,
          currentTyres: tyreDetails.currentTyres || '',
          preferredBrands: tyreDetails.preferredBrands || ''
        },
        
        // Contact details
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        notes: contactForm.notes || '',
        preferredContact: contactForm.preferredContact || 'email',
        
        // Photo information
        hasPhotos: wheelPhotos.length > 0,
        photoCount: wheelPhotos.length,
        noPhotosReason: noPhotosReason || '',
        
        // Metadata
        createdAt: serverTimestamp(),
        submittedAt: new Date().toISOString(),
        status: 'pending'
      }

      // Save to Firestore
      const quotesRef = collection(db, 'quotes')
      const docRef = await addDoc(quotesRef, quoteData)
      console.log('Quote saved successfully with ID:', docRef.id)

      // Prepare email data
      const formData = new FormData()
      formData.append('data', JSON.stringify({
        serviceType,
        serviceDetails: {
          ...serviceDetails,
          wheelDetails: {
            size: serviceDetails.wheelSize,
            paintColor: serviceDetails.paintColor
          }
        },
        contact: {
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          preferredContact: contactForm.preferredContact,
          notes: contactForm.notes
        },
        location,
        distance,
        noPhotosReason: noPhotosReason || null
      }))

      // Add photos if any
      wheelPhotos.forEach(photo => {
        formData.append('photos', photo)
      })

      // Send emails
      const emailResponse = await fetch('/api/submit-quote', {
        method: 'POST',
        body: formData
      })

      if (!emailResponse.ok) {
        console.warn('Email notification failed, but quote was saved')
      }

      setShowSuccess(true)
    } catch (error) {
      console.error('Submission error:', error)
      setFormError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update the LoadingOverlay component to receive props
  const LoadingOverlay = ({ status }: { 
    status: { stage: 'idle' | 'compressing' | 'uploading' | 'sending' | 'complete', progress: number }
  }) => {
    const getStatusText = () => {
      switch (status.stage) {
        case 'compressing':
          return 'Optimizing photos for upload...'
        case 'uploading':
          return 'Uploading photos...'
        case 'sending':
          return 'Sending your request...'
        case 'complete':
          return 'Complete!'
        default:
          return 'Processing...'
      }
    }

    return (
      <div className="absolute inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="max-w-[280px] md:max-w-sm w-full mx-auto text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <svg 
              className="animate-spin w-16 h-16 text-[#3E797F]" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <div 
              className="absolute inset-0 flex items-center justify-center text-sm font-medium"
              style={{ color: '#3E797F' }}
            >
              {status.progress}%
            </div>
          </div>
          <p className="text-base font-medium mb-3 text-white">{getStatusText()}</p>
          <div className="w-full bg-[#3E797F]/20 rounded-full h-1.5 mb-3">
            <div 
              className="bg-[#3E797F] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${status.progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">
            Please don't close this window
          </p>
        </div>
      </div>
    )
  }

  // Add success overlay component
  const SuccessOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black/90 border border-[#3E797F]/30 rounded-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#3E797F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-[#3E797F]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Quote Submitted!</h3>
          <p className="text-gray-400 mb-6">
            We'll get back to you shortly with a detailed quote.
          </p>
          <button
            onClick={onClose}
            className="bg-[#3E797F] text-white px-6 py-2 rounded-lg hover:bg-[#3E797F]/80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  // Add this test function inside your ServiceBooking component
  const testFirebase = async () => {
    console.log('Testing Firebase connection...')
    try {
      // Try to write a test document
      const testData = {
        test: true,
        timestamp: new Date().toISOString()
      }
      
      console.log('DB instance:', db)
      console.log('Writing test data:', testData)
      
      const testRef = collection(db, 'test')
      const testDoc = await addDoc(testRef, testData)
      
      console.log('Test document written with ID:', testDoc.id)
      
      // Try to read it back
      const querySnapshot = await getDocs(collection(db, 'test'))
      console.log('Found', querySnapshot.size, 'test documents')
      
      return true
    } catch (error) {
      console.error('Firebase test failed:', error)
      return false
    }
  }

  useEffect(() => {
    const testConnection = async () => {
      try {
        const testRef = collection(db, 'test')
        const testDoc = await addDoc(testRef, {
          test: true,
          timestamp: serverTimestamp()
        })
        console.log('Firebase connection test successful:', testDoc.id)
      } catch (error) {
        console.error('Firebase connection test failed:', error)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-black/90 w-full h-full md:h-auto md:max-h-[90vh] md:max-w-lg rounded-none md:rounded-xl border-0 md:border border-[#3E797F]/30 overflow-hidden flex flex-col">
        {showSuccess ? (
          <SuccessOverlay />
        ) : (
          <>
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-[#3E797F]/30 safe-top">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg md:text-xl font-bold">Request a Quote</h3>
              <p className="text-sm text-gray-400 mt-1">{location}</p>
            </div>

            {/* Content - Add ref here */}
            <div ref={contentRef} className="flex-1 overflow-y-auto scroll-smooth">
              <div className="p-4 md:p-6">
                <StepIndicator />
                {renderStep()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 