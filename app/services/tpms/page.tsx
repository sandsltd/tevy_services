'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import dynamic from 'next/dynamic'
import { 
  Gauge, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Clock,
  Shield,
  Phone,
  ChevronDown,
  AlertTriangle,
  Settings
} from 'lucide-react'
import { contactInfo } from '../../constants/contact'

// Dynamic import of map component
const DynamicCoverageMap = dynamic(() => import('../../components/MapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-black/20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3E797F] border-t-transparent"></div>
    </div>
  )
})

// FAQ Component
type FAQItemProps = {
  question: string;
  answer: string | React.ReactNode;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border border-[#3E797F]/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between bg-black/20 hover:bg-black/30 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`
        overflow-hidden transition-all duration-300
        ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-6 pt-0 text-gray-400">
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function TPMSService() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <Image
              src="/images/services/tmps_exeter.jpg"
              alt="Professional TPMS Service and Diagnostics"
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
            <div className="absolute right-0 w-[50px] h-full bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
          </div>
        </div>

        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl pt-32">
            {/* Trust Indicators */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                ))}
              </div>
              <span className="text-white/80 text-sm">Expert TPMS Diagnostics & Repair</span>
            </div>

            {/* SEO-Optimized H1 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-white">Professional</span>
              <span className="block text-[#3E797F]">TPMS Service</span>
              <span className="block text-2xl md:text-3xl font-normal text-gray-400 mt-4">
                Complete Tyre Pressure Monitoring System Solutions
              </span>
            </h1>

            {/* MOT Notice */}
            <div className="bg-[#3E797F]/10 border border-[#3E797F] rounded-xl p-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500 animate-pulse-warning" />
                <span className="font-semibold text-yellow-500">TPMS Warning Light On?</span>
              </div>
              <p className="text-gray-400 text-sm">
                A faulty TPMS system can cause an MOT failure. Visit our workshop for 
                professional diagnostics and repairs.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Expert Diagnostics</span>
                </div>
                <p className="text-sm text-gray-400">Advanced TPMS diagnostic equipment</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Genuine Parts</span>
                </div>
                <p className="text-sm text-gray-400">OE-quality sensors and components</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-[#3E797F] hover:bg-[#3E797F]/80 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2">
                <span>Book TPMS Service</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TPMS Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">TPMS</span>{" "}
            <span className="text-white">Services</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "TPMS Diagnostics",
                description: "Professional diagnosis of TPMS faults using advanced diagnostic equipment. We identify sensor issues, battery problems, and system malfunctions.",
                features: [
                  "Full system scan",
                  "Sensor testing",
                  "Battery level check",
                  "Warning light diagnosis"
                ]
              },
              {
                title: "Sensor Replacement",
                description: "Complete TPMS sensor replacement service using OE-quality parts. We program and calibrate new sensors to your vehicle.",
                features: [
                  "OE-quality sensors",
                  "Professional programming",
                  "System calibration",
                  "Full testing"
                ]
              },
              {
                title: "Valve Service",
                description: "TPMS valve maintenance and replacement service to prevent leaks and sensor damage. Essential for MOT compliance.",
                features: [
                  "Valve core replacement",
                  "Seal replacement",
                  "Torque specification",
                  "Leak testing"
                ]
              }
            ].map((service, index) => (
              <div key={index} className="bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of TPMS */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Understanding</span>{" "}
            <span className="text-white">TPMS Systems</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            We service both direct and indirect TPMS systems, providing comprehensive solutions for all vehicle types.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
              <h3 className="text-2xl font-bold mb-4">Direct TPMS</h3>
              <p className="text-gray-400 mb-6">
                Uses physical sensors mounted in each wheel to monitor tyre pressure and temperature. 
                Common in most modern vehicles post-2014.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                  <span>Real-time pressure monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                  <span>Individual tyre readings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                  <span>Temperature monitoring</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
              <h3 className="text-2xl font-bold mb-4">Indirect TPMS</h3>
              <p className="text-gray-400 mb-6">
                Uses ABS sensors to detect pressure changes through wheel rotation speed. 
                Common in older vehicles and some modern cars.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                  <span>No physical sensors required</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                  <span>System calibration service</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                  <span>ABS system integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Our Service</span>{" "}
            <span className="text-white">Process</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Our comprehensive TPMS service process ensures your system is working correctly and meets MOT requirements.
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Initial Scan",
                description: "Complete system diagnostic scan to identify any TPMS faults or issues."
              },
              {
                step: "2",
                title: "Inspection",
                description: "Physical inspection of sensors, valve stems, and system components."
              },
              {
                step: "3",
                title: "Service/Repair",
                description: "Replacement of faulty parts and service of valve components."
              },
              {
                step: "4",
                title: "Programming",
                description: "Sensor programming and system calibration followed by testing."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <div className="absolute -top-4 left-4 bg-[#3E797F] w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">TPMS</span>{" "}
            <span className="text-white">Pricing</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            We offer competitive pricing for all TPMS services. Contact us today for a personalized quote.
          </p>

          <div className="max-w-3xl mx-auto bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-2xl p-8 md:p-12">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold">Get Your Free Quote Today</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <Shield className="w-8 h-8 text-[#3E797F] mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Diagnostics</h4>
                  <p className="text-sm text-gray-400">Full system diagnostic scan</p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <Gauge className="w-8 h-8 text-[#3E797F] mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Sensor Service</h4>
                  <p className="text-sm text-gray-400">Including programming</p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <Settings className="w-8 h-8 text-[#3E797F] mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">System Reset</h4>
                  <p className="text-sm text-gray-400">Full calibration service</p>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => {
                    const mapSection = document.getElementById('workshop-location');
                    if (mapSection) {
                      mapSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-lg font-semibold transition-colors mx-auto"
                >
                  <span>Get Your Free Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-sm text-gray-400 mt-4">
                  Fast response • No obligation • Best price guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Location */}
      <section id="workshop-location" className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Workshop</span>{" "}
            <span className="text-white">Location</span>
          </h2>
          
          <div className="max-w-5xl mx-auto">
            {/* Workshop Only Notice */}
            <div className="bg-[#3E797F]/10 border border-[#3E797F] rounded-xl p-6 mb-12 text-center">
              <h3 className="text-xl font-semibold mb-2">Workshop Service Only</h3>
              <p className="text-gray-400">
                All TPMS services are performed at our fully-equipped Marsh Barton facility. 
                We do not offer mobile TPMS services to ensure accurate diagnostics and programming.
              </p>
            </div>

            <div className="mb-8 text-center">
              <p className="text-lg md:text-xl text-gray-300">
                Visit our state-of-the-art workshop in Marsh Barton, Exeter. 
                Equipped with professional TPMS diagnostic and programming equipment.
              </p>
            </div>
            
            {/* Map Container */}
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0">
                <DynamicCoverageMap />
              </div>
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Opening Hours</h3>
                  <p className="text-sm text-gray-400">
                    Mon-Fri: 9:00am - 5:30pm<br />
                    Saturday / Sunday: Closed
                  </p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Workshop Address</h3>
                  <p className="text-sm text-gray-400">
                    Marsh Barton Trading Estate<br />
                    Exeter, Devon<br />
                    Free customer parking available
                  </p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Facilities</h3>
                  <p className="text-sm text-gray-400">
                    Professional TPMS equipment<br />
                    Diagnostic tools<br />
                    Programming capabilities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Common TPMS</span>{" "}
            <span className="text-white">Questions</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Find answers to common questions about TPMS service and maintenance
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem 
              question="What is TPMS and why is it important?"
              answer="TPMS (Tyre Pressure Monitoring System) continuously monitors your tyre pressures and alerts you to any issues. It's important for safety, fuel efficiency, and is now part of the MOT test for vehicles registered after 2012."
            />
            
            <FAQItem 
              question="How do I know if my TPMS needs service?"
              answer="Common signs include: TPMS warning light staying on, incorrect pressure readings, or system failure warnings. Regular service is recommended every time tyres are changed or every 5 years for sensor battery replacement."
            />
            
            <FAQItem 
              question="What's included in a TPMS service?"
              answer={
                <div className="space-y-2">
                  <p>Our comprehensive TPMS service includes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Full system diagnostic scan</li>
                    <li>Sensor battery check</li>
                    <li>Valve stem inspection</li>
                    <li>System calibration</li>
                    <li>Programming of new sensors if required</li>
                  </ul>
                </div>
              }
            />
            
            <FAQItem 
              question="Will a faulty TPMS fail my MOT?"
              answer="Yes, for vehicles first registered after January 2012, a faulty TPMS system will result in an MOT failure. This includes malfunctioning sensors, warning lights staying on, or system errors."
            />
            
            <FAQItem 
              question="How long does a TPMS service take?"
              answer="A standard TPMS diagnostic check takes about 30 minutes. If sensor replacement is needed, it typically takes 45-60 minutes for a full set. We aim to complete most TPMS services within the same day."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 