'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import dynamic from 'next/dynamic'
import { 
  CheckCircle2, 
  ArrowRight,
  Star,
  Clock,
  Shield,
  Wrench,
  Phone,
  ChevronDown
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

export default function TyresExeter() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/services/tyres_exeter.jpg"
              alt="Professional Tyre Fitting Service in Exeter"
              fill
              className="object-cover object-center scale-105 animate-subtle-zoom"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
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
              <span className="text-white/80 text-sm">Trusted Tyre Specialists in Exeter</span>
            </div>

            {/* SEO-Optimized H1 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-white">Professional</span>
              <span className="block text-[#3E797F]">Tyres Exeter</span>
              <span className="block text-2xl md:text-3xl font-normal text-gray-400 mt-4">
                Expert Tyre Fitting & Replacement Services at Our Marsh Barton Facility
              </span>
            </h1>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Premium Brands</span>
                </div>
                <p className="text-sm text-gray-400">Wide selection of trusted tyre manufacturers</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Same Day Service</span>
                </div>
                <p className="text-sm text-gray-400">Quick turnaround on most tyre fittings</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
                className="group bg-[#3E797F] hover:bg-[#3E797F]/80 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => {
                  const brandsSection = document.getElementById('tyre-brands');
                  if (brandsSection) {
                    brandsSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                View Tyre Range
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tyre Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Professional</span>{" "}
            <span className="text-white">Tyre Services</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Tyre Fitting",
                description: "Professional fitting service for all vehicle types. We stock and fit tyres from all major manufacturers.",
                features: [
                  "Same-day fitting available",
                  "All major brands stocked",
                  "Wheel balancing included",
                  "Expert installation"
                ]
              },
              {
                title: "Tyre Repairs",
                description: "Quick and reliable puncture repair service following British Standard guidelines.",
                features: [
                  "Puncture assessment",
                  "Professional repairs",
                  "Safety inspection",
                  "Competitive pricing"
                ]
              },
              {
                title: "TPMS Service",
                description: "Complete tyre pressure monitoring solutions to keep your vehicle safe and compliant.",
                features: [
                  "Sensor diagnostics",
                  "Sensor replacement",
                  "System resets",
                  "Full calibration"
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

      {/* Motorcycle Tyre Service */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="text-[#3E797F]">Motorcycle</span>{" "}
                  <span className="text-white">Tyre Fitting</span>
                </h2>
                
                <p className="text-gray-400 mb-6">
                  Professional motorcycle tyre fitting service available at our Marsh Barton workshop. 
                  Bring us your loose wheels and we'll fit your new tyres with precision and care.
                </p>

                <div className="bg-[#3E797F]/10 border border-[#3E797F] rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold mb-2">Important Note:</p>
                  <p className="text-sm text-gray-400">
                    This is a loose wheel service only. We do not offer ride-in motorcycle tyre fitting. 
                    Please remove your wheels before bringing them to our workshop.
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                    Professional fitting for all motorcycle tyre types
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                    Wheel balancing included
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                    Same-day service available
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                    Competitive pricing
                  </li>
                </ul>

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
                  className="bg-[#3E797F] hover:bg-[#3E797F]/80 px-6 py-3 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
                >
                  <span>Get Motorcycle Tyre Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="md:w-1/3">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/motorcycle_tyre_fitting_exeter.png"
                    alt="Motorcycle Tyre Fitting Service in Exeter"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brand - Maxxis */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="bg-black/20 p-8 rounded-xl border border-[#3E797F]/20">
                  <Image
                    src="/images/tyre_brands/maxxis_tyres.png"
                    alt="Maxxis Tyres"
                    width={300}
                    height={150}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-[#3E797F]">Featured Brand:</span>{" "}
                  <span className="text-white">Maxxis Tyres</span>
                </h2>

                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    We're proud to recommend Maxxis tyres for their exceptional value and unique customer-friendly policies.
                  </p>

                  <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#3E797F]" />
                      Pro-Rata Warranty
                    </h3>
                    <p className="text-gray-400">
                      Maxxis offers a unique wear-based replacement policy - you only pay for the wear on your tyres. 
                      This means if your tyres need replacing early, you'll only be charged for the tread you've used.
                    </p>
                  </div>

                  <ul className="grid md:grid-cols-2 gap-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3E797F] mt-1" />
                      <span className="text-gray-300">
                        Fair pricing based on actual tyre wear
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3E797F] mt-1" />
                      <span className="text-gray-300">
                        High-performance compounds
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3E797F] mt-1" />
                      <span className="text-gray-300">
                        Excellent wet weather grip
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3E797F] mt-1" />
                      <span className="text-gray-300">
                        Extended tread life guarantee
                      </span>
                    </li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-white font-semibold transition-colors w-full"
                    >
                      <span>Get Maxxis Tyre Quote</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Stock */}
      <section id="tyre-brands" className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Premium</span>{" "}
            <span className="text-white">Tyre Brands</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            We stock a comprehensive range of tyres from leading manufacturers, ensuring quality and performance for every budget.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                name: "Michelin",
                image: "/images/tyre_brands/michelin_tyres.png",
                url: "https://www.michelin.co.uk"
              },
              {
                name: "Bridgestone",
                image: "/images/tyre_brands/bridgestone_tyres.png",
                url: "https://www.bridgestone.co.uk"
              },
              {
                name: "Continental",
                image: "/images/tyre_brands/continental_tyres.png",
                url: "https://www.continental-tyres.co.uk"
              },
              {
                name: "Pirelli",
                image: "/images/tyre_brands/pirelli_tyres.png",
                url: "https://www.pirelli.com/tyres/en-gb"
              },
              {
                name: "Goodyear",
                image: "/images/tyre_brands/goodyear_tyres.png",
                url: "https://www.goodyear.eu/en_gb"
              },
              {
                name: "Dunlop",
                image: "/images/tyre_brands/dunlop_tyres.png",
                url: "https://www.dunlop.eu/en_gb"
              },
              {
                name: "Hankook",
                image: "/images/tyre_brands/jankook_tyres.png",
                url: "https://www.hankooktire.com/uk"
              },
              {
                name: "Falken",
                image: "/images/tyre_brands/falken_tyres.png",
                url: "https://www.falkentyre.com/en"
              }
            ].map((brand, index) => (
              <a
                key={index}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20 flex items-center justify-center hover:bg-black/30 transition-all group"
              >
                <Image
                  src={brand.image}
                  alt={`${brand.name} Tyres`}
                  width={160}
                  height={80}
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Competitive</span>{" "}
            <span className="text-white">Pricing</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            We offer competitive pricing across our full range of tyres, with options to suit every budget.
            Contact us today for a personalized quote.
          </p>

          <div className="max-w-3xl mx-auto bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-2xl p-8 md:p-12">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold">Get Your Free Quote Today</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <Shield className="w-8 h-8 text-[#3E797F] mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Budget Options</h4>
                  <p className="text-sm text-gray-400">Quality tyres at affordable prices</p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <Star className="w-8 h-8 text-[#3E797F] mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Premium Brands</h4>
                  <p className="text-sm text-gray-400">High-performance tyre options</p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <CheckCircle2 className="w-8 h-8 text-[#3E797F] mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Price Match</h4>
                  <p className="text-sm text-gray-400">Competitive pricing guaranteed</p>
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
                Our professional tyre fitting service is available exclusively at our 
                fully-equipped Marsh Barton facility. We do not offer mobile tyre fitting, 
                ensuring the highest quality service and safety standards.
              </p>
            </div>

            <div className="mb-8 text-center">
              <p className="text-lg md:text-xl text-gray-300">
                Visit our state-of-the-art workshop in Marsh Barton, Exeter. 
                Equipped with the latest tyre fitting and balancing technology.
              </p>
            </div>
            
            {/* Map Container */}
            <div className="w-full h-[600px] rounded-2xl overflow-hidden">
              <DynamicCoverageMap />
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
                    Customer waiting area<br />
                    Complimentary refreshments<br />
                    Wi-Fi available
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#3E797F]" />
                  Why Choose Our Workshop?
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      State-of-the-art tyre fitting equipment
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Professional wheel balancing service
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Comprehensive safety checks
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Expert technicians on site
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Large stock of tyres available
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Controlled fitting environment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Frequently Asked</span>{" "}
            <span className="text-white">Questions</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Find answers to common questions about our tyre services in Exeter
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem 
              question="Where is your tyre fitting workshop located?"
              answer="Our workshop is located in the Marsh Barton Trading Estate, Exeter. We're easily accessible and offer free customer parking. All tyre services are performed at our fully-equipped workshop facility."
            />
            
            <FAQItem 
              question="Do you offer mobile tyre fitting in Exeter?"
              answer="No, we exclusively provide our tyre services at our Marsh Barton workshop. This allows us to maintain the highest standards of service and safety, using our professional equipment and controlled environment."
            />
            
            <FAQItem 
              question="What brands of tyres do you stock in Exeter?"
              answer={
                <div className="space-y-2">
                  <p>We stock all major tyre brands including:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Premium: Michelin, Bridgestone, Continental, Pirelli</li>
                    <li>Mid-range: Goodyear, Dunlop, Hankook</li>
                    <li>Budget-friendly options also available</li>
                  </ul>
                  <p>Most tyres are available for same-day fitting at our workshop.</p>
                </div>
              }
            />
            
            <FAQItem 
              question="How long does tyre fitting take?"
              answer="At our Marsh Barton workshop, a standard tyre fitting service typically takes 30-45 minutes for a full set. This includes balancing and safety checks. Same-day service is usually available, but we recommend booking in advance."
            />
            
            <FAQItem 
              question="What's included in your tyre fitting service?"
              answer={
                <div className="space-y-2">
                  <p>Our comprehensive workshop service includes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Professional tyre fitting</li>
                    <li>Wheel balancing</li>
                    <li>New valves</li>
                    <li>Tyre pressure adjustment</li>
                    <li>Old tyre disposal</li>
                  </ul>
                </div>
              }
            />
            
            <FAQItem 
              question="Do you offer wheel alignment in Exeter?"
              answer="Yes, we provide professional wheel alignment services at our Marsh Barton workshop using the latest laser alignment equipment. This service helps ensure even tyre wear and optimal vehicle handling."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm" id="contact">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Book Your</span>{" "}
            <span className="text-white">Tyre Fitting</span>
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white mb-6">Workshop Contact</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#3E797F] mt-1" />
                    <div>
                      <p className="font-semibold text-white">Call Our Workshop</p>
                      <a href={`tel:${contactInfo.phone}`} className="text-gray-300 hover:text-[#3E797F] transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#3E797F] mt-1" />
                    <div>
                      <p className="font-semibold text-white">Opening Hours</p>
                      <p className="text-gray-300">
                        Mon-Fri: 8:30am - 5:30pm<br />
                        Saturday: 9am - 4pm
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#3E797F]/10 p-4 rounded-lg border border-[#3E797F]/20">
                    <p className="text-sm text-gray-300">
                      <strong>Workshop Service Only:</strong> All tyre services are performed at our 
                      fully-equipped Marsh Barton facility. We do not offer mobile fitting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote Request Form */}
              <div className="bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
                <h3 className="text-2xl font-bold text-white mb-6">Get a Quote</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Vehicle Registration (Optional)"
                      className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us about the tyres you need..."
                      rows={4}
                      className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#3E797F] hover:bg-[#3E797F]/80 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                  >
                    Request Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 