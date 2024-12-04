'use client'
import { useState } from 'react'
import { 
  Diamond, 
  Paintbrush, 
  Car, 
  Building2, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'

type Service = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  availability: {
    garage: boolean
    mobile: boolean
  }
}

type ServiceLocation = 'mobile' | 'workshop'
type WheelCount = 1 | 2 | 3 | 4
type TimePreference = 'asap' | 'flexible' | 'specific'

interface FormData {
  service: Service | null
  location: ServiceLocation | null
  wheelCount: WheelCount | null
  timePreference: TimePreference | null
  specificDate?: string
  name: string
  email: string
  phone: string
  postcode: string
  additionalInfo: string
}

const SERVICES: Service[] = [
  {
    id: 'diamond-cut',
    title: 'Diamond Cut Refurbishment',
    description: 'State-of-the-art diamond cutting service. We restore damaged alloy wheels to their original finish.',
    icon: <Diamond className="w-8 h-8" />,
    availability: { garage: true, mobile: true }
  },
  {
    id: 'painted',
    title: 'Painted Alloys & Colour Changes',
    description: 'Full wheel repainting service including colour changes and custom finishes.',
    icon: <Paintbrush className="w-8 h-8" />,
    availability: { garage: true, mobile: true }
  }
]

export default function QuoteWizard() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    service: null,
    location: null,
    wheelCount: null,
    timePreference: null,
    name: '',
    email: '',
    phone: '',
    postcode: '',
    additionalInfo: ''
  })

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const renderServiceSelection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center">Select Your Service</h3>
      <div className="grid gap-4">
        {SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => {
              updateFormData('service', service)
              nextStep()
            }}
            className={`
              p-6 rounded-xl border transition-all duration-300
              ${formData.service?.id === service.id
                ? 'border-[#3E797F] bg-[#3E797F]/10'
                : 'border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className="text-[#3E797F]">{service.icon}</div>
              <div className="text-left">
                <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                <p className="text-gray-400 text-sm">{service.description}</p>
                <div className="flex gap-2 mt-3">
                  {service.availability.garage && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#3E797F]/20 border border-[#3E797F]/30">
                      <Building2 className="w-3 h-3" />
                      Workshop
                    </span>
                  )}
                  {service.availability.mobile && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#3E797F]/20 border border-[#3E797F]/30">
                      <Car className="w-3 h-3" />
                      Mobile
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  const renderLocationPreference = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center">Choose Service Location</h3>
      <p className="text-center text-gray-400">
        Would you prefer us to come to you, or would you like to visit our workshop?
      </p>
      <div className="grid gap-4">
        <button
          onClick={() => {
            updateFormData('location', 'mobile')
            nextStep()
          }}
          className="p-6 rounded-xl border border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <Car className="w-8 h-8 text-[#3E797F]" />
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-1">Mobile Service</h4>
              <p className="text-gray-400 text-sm">We'll come to your location</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            updateFormData('location', 'workshop')
            nextStep()
          }}
          className="p-6 rounded-xl border border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <Building2 className="w-8 h-8 text-[#3E797F]" />
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-1">Workshop Visit</h4>
              <p className="text-gray-400 text-sm">Visit our Marsh Barton facility</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )

  const renderWheelCount = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center">How Many Wheels?</h3>
      <p className="text-center text-gray-400">
        Select the number of wheels that need attention
      </p>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((count) => (
          <button
            key={count}
            onClick={() => {
              updateFormData('wheelCount', count as WheelCount)
              nextStep()
            }}
            className={`
              p-6 rounded-xl border transition-all duration-300
              ${formData.wheelCount === count
                ? 'border-[#3E797F] bg-[#3E797F]/10'
                : 'border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50'
              }
            `}
          >
            <div className="text-center">
              <span className="text-3xl font-bold">{count}</span>
              <span className="block text-sm text-gray-400 mt-2">
                {count === 1 ? 'Wheel' : 'Wheels'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  const renderTimePreference = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center">When Do You Need It?</h3>
      <div className="grid gap-4">
        <button
          onClick={() => {
            updateFormData('timePreference', 'asap')
            nextStep()
          }}
          className="p-6 rounded-xl border border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="text-[#3E797F] font-bold text-xl">ASAP</div>
            <div className="text-left">
              <p className="text-gray-400 text-sm">I need this done as soon as possible</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            updateFormData('timePreference', 'flexible')
            nextStep()
          }}
          className="p-6 rounded-xl border border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="text-[#3E797F] font-bold text-xl">Flexible</div>
            <div className="text-left">
              <p className="text-gray-400 text-sm">I'm flexible with timing</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            updateFormData('timePreference', 'specific')
            nextStep()
          }}
          className="p-6 rounded-xl border border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="text-[#3E797F] font-bold text-xl">Specific Date</div>
            <div className="text-left">
              <p className="text-gray-400 text-sm">I have a specific date in mind</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )

  const renderContactDetails = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center">Your Details</h3>
      <p className="text-center text-gray-400">
        We'll use these details to contact you with your quote
      </p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors"
              placeholder="Your phone number"
            />
          </div>

          {formData.location === 'mobile' && (
            <div>
              <label className="block text-sm font-medium mb-1">Postcode</label>
              <input
                type="text"
                value={formData.postcode}
                onChange={(e) => updateFormData('postcode', e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors"
                placeholder="Your postcode"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Additional Information</label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => updateFormData('additionalInfo', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors resize-none"
              placeholder="Any additional details about your wheels or requirements"
            />
          </div>
        </div>

        <button
          onClick={() => nextStep()}
          className="w-full bg-[#3E797F] hover:bg-[#3E797F]/80 px-6 py-3 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2"
        >
          Submit Quote Request
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  )

  const renderSummary = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3E797F]/20 mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#3E797F]" />
        </div>
        <h3 className="text-2xl font-bold">Quote Request Sent!</h3>
        <p className="text-gray-400 mt-2">
          We'll get back to you within 24 hours with your personalized quote.
        </p>
      </div>

      <div className="bg-black/40 rounded-lg p-6 space-y-4">
        <h4 className="font-semibold">Your Request Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Service</span>
            <span>{formData.service?.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Location</span>
            <span>{formData.location === 'mobile' ? 'Mobile Service' : 'Workshop Visit'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Wheels</span>
            <span>{formData.wheelCount} {formData.wheelCount === 1 ? 'Wheel' : 'Wheels'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Timing</span>
            <span>{formData.timePreference === 'asap' ? 'As Soon As Possible' : 
                   formData.timePreference === 'flexible' ? 'Flexible' : 'Specific Date'}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setStep(0)
          setFormData({
            service: null,
            location: null,
            wheelCount: null,
            timePreference: null,
            name: '',
            email: '',
            phone: '',
            postcode: '',
            additionalInfo: ''
          })
        }}
        className="w-full bg-black/40 hover:bg-black/60 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
      >
        Start New Quote
      </button>
    </div>
  )

  const steps = [
    renderServiceSelection,
    renderLocationPreference,
    renderWheelCount,
    renderTimePreference,
    renderContactDetails,
    renderSummary
  ]

  return (
    <div className="bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
      {steps[step]()}
      
      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${i === step ? 'bg-[#3E797F]' : 'bg-[#3E797F]/20'}
            `}
          />
        ))}
      </div>
    </div>
  )
} 