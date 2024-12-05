'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Navigation from './components/Navigation'
import { 
  Diamond, 
  Paintbrush, 
  Car, 
  Disc,  
  Wrench, 
  Gauge, 
  Phone, 
  Mail, 
  Facebook,  
  Instagram, 
  MapPin, 
  Star, 
  Quote, 
  Clock, 
  Check, 
  Building2, 
  ArrowRight, 
  ImageIcon, 
  ChevronDown 
} from 'lucide-react'
import { contactInfo } from './constants/contact'
import Footer from './components/Footer'
import { useReversibleVideo } from './hooks/useReversibleVideo'
import dynamic from 'next/dynamic'
import MapWrapper from './components/MapWrapper'

type ServiceAvailability = {
  garage: boolean;
  mobile: boolean;
}

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  availability: ServiceAvailability;
}

type ServiceCardProps = {
  service: Service;
  className?: string;
  style?: React.CSSProperties;
}

const DynamicQuoteWizard = dynamic(() => import('./components/QuoteWizard'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[400px] rounded-2xl bg-black/20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3E797F] border-t-transparent"></div>
    </div>
  )
})

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { videoRef, overlayVideoRef } = useReversibleVideo()

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <Navigation className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-black">
        {/* Background container with overflow hidden */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 scale-110"> {/* Scale up container to prevent edge gaps */}
            <Image
              src="/images/hero.jpg"
              alt="Professional Wheel Restoration"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="100vw"
              priority
              quality={100}
              className="scale-105 animate-subtle-zoom"
            />
            {/* Extend overlays beyond bottom edge */}
            <div className="absolute inset-0 -bottom-8 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            <div className="absolute inset-0 -bottom-8 bg-gradient-to-b from-transparent via-black/80 to-black" />
          </div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 animate-fade-in mt-[140px] md:mt-[120px]">
            <div className="max-w-4xl">
              {/* Trust Badge with reduced spacing */}
              <div className="flex items-center gap-3 mb-8 animate-fade-in-up mt-[100px] md:mt-[80px]">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">5.0 on Google</span>
              </div>

              {/* Main Heading with adjusted spacing */}
              <h1 className="mb-6">
                <span className="text-4xl md:text-6xl lg:text-7xl font-bold block animate-slide-up">
                  <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Alloy Wheel</span>{" "}
                  <span className="text-[#3E797F] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Refurbishment</span>{" "}
                  <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Exeter</span>
                </span>
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E797F] block animate-slide-up delay-100 leading-tight mt-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Restoring South West Alloys Since 2020
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl animate-fade-in-up delay-300 font-medium leading-relaxed">
                Specialists in diamond cut restoration, with additional services including custom paint finishes and wheel repairs. Professional service at your location or our Marsh Barton facility, delivering premium alloy wheel solutions across the South West.
              </p>

              {/* Service Types with refined styling */}
              <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up delay-300">
                <span className="group px-6 py-3 rounded-2xl bg-black/40 text-base border border-[#3E797F]/20 text-white hover:bg-black/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm">
                  <span>Diamond Cut Refurbishment</span>
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                  </svg>
                </span>

                <span className="group px-6 py-3 rounded-2xl bg-black/40 text-base border border-[#3E797F]/20 text-white hover:bg-black/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm">
                  <span>Custom Paint Finishes</span>
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128m0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                  </svg>
                </span>

                <span className="group px-6 py-3 rounded-2xl bg-black/40 text-base border border-[#3E797F]/20 text-white hover:bg-black/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm">
                  <span>Wheel Repairs</span>
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                  </svg>
                </span>

                <span className="group px-6 py-3 rounded-2xl bg-black/40 text-base border border-[#3E797F]/20 text-white hover:bg-black/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm">
                  <span>TPMS Diagnostics</span>
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </span>
              </div>

              {/* CTAs with premium styling */}
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-500 mb-32">
                <button className="group relative bg-[#3E797F] px-10 py-5 rounded-lg text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 min-w-[280px] overflow-hidden hover:shadow-[0_0_20px_rgba(62,121,127,0.3)] border border-[#3E797F]">
                  {/* Gradient overlay for shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Button content */}
                  <span className="relative z-10 tracking-wide">Get Your Free Quote</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  
                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#3E797F] blur-xl -z-10" />
                </button>

                <button 
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="group bg-black/40 backdrop-blur-sm px-10 py-5 rounded-lg text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 border border-[#3E797F]/20 hover:border-[#3E797F] min-w-[280px] hover:bg-black/60"
                >
                  <span className="relative z-10">Explore Our Services</span>
                  <ChevronDown className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300 relative z-10" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-tevy-teal">Our</span> Services
          </h2>
          
          {/* Primary Services - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-8">
            {services.slice(0, 2).map((service, index) => (
              <ServiceCard 
                key={index} 
                service={service} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              />
            ))}
          </div>

          {/* Secondary Services - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {services.slice(2).map((service, index) => (
              <ServiceCard 
                key={index + 2} 
                service={service} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index + 2) * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-[#706F6F]/10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">About</span> Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Professional Wheel & Automotive Services</h3>
              <p className="text-gray-300 mb-6">
                Based in Teignmouth and with our new state-of-the-art facility in Marsh Barton, 
                Tevy Services specializes in comprehensive wheel restoration and automotive solutions. 
                Our expertise spans from diamond cut refurbishment to custom wheel painting, with mobile 
                services available across the South West.
              </p>
              <p className="text-gray-300 mb-6">
                Our recent expansion includes a dedicated unit equipped with cutting-edge Diamond Cut 
                Refinishing technology, complemented by our full range of tyre services and automotive 
                key solutions. Whether you need mobile wheel repairs or workshop-based services, we're 
                committed to delivering exceptional results.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="text-[#3E797F] w-5 h-5" />
                  <span>Diamond cut & painted alloy wheel restoration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-[#3E797F] w-5 h-5" />
                  <span>Professional key cutting & programming services</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-[#3E797F] w-5 h-5" />
                  <span>Complete tyre fitting & TPMS solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-[#3E797F] w-5 h-5" />
                  <span>Mobile service available for wheel restoration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-[#3E797F] w-5 h-5" />
                  <span>State-of-the-art Marsh Barton facility</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-[#3E797F] w-5 h-5" />
                  <span>24-hour turnaround on most services</span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 mt-8 mb-8">
                <div className="text-center p-4 bg-black/30 rounded-xl border border-[#3E797F]/20 hover:border-[#3E797F] transition-all">
                  <div className="text-3xl font-bold text-[#3E797F] mb-2">500+</div>
                  <div className="text-sm text-gray-400">Wheels Restored</div>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-xl border border-[#3E797F]/20 hover:border-[#3E797F] transition-all">
                  <div className="text-3xl font-bold text-[#3E797F] mb-2">24h</div>
                  <div className="text-sm text-gray-400">Turnaround Time</div>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-xl border border-[#3E797F]/20 hover:border-[#3E797F] transition-all">
                  <div className="text-3xl font-bold text-[#3E797F] mb-2">5.0</div>
                  <div className="text-sm text-gray-400">Google Rating</div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-[#3E797F] hover:bg-[#3E797F]/90 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 mt-8">
                Book Your Service
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Image Grid */}
            <div className="space-y-6">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <video
                  ref={videoRef}
                  className="object-cover w-full h-full"
                  autoPlay
                  muted
                  playsInline
                  loop
                >
                  <source src="/images/diamond_cutting.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-lg font-semibold">Diamond Cut Refinishing</div>
                    <div className="text-sm text-gray-300">State-of-the-art equipment</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/mobile_service.jpg"
                    alt="Mobile Service"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <div className="text-sm font-semibold">Mobile Service</div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/workshop_exeter.jpeg"
                    alt="Workshop"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <div className="text-sm font-semibold">Workshop Facility</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Customer</span> Reviews
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3E797F] mb-2">5.0</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                ))}
              </div>
              <div className="text-gray-400">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3E797F] mb-2">100+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3E797F] mb-2">500+</div>
              <div className="text-gray-400">Wheels Restored</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3E797F] mb-2">24h</div>
              <div className="text-gray-400">Quick Turnaround</div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-[#3E797F]/20 hover:border-[#3E797F] transition-all"
              >
                <Quote className="w-8 h-8 text-[#3E797F] mb-4" />
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#3E797F] fill-[#3E797F]" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">{testimonial.date}</span>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.text}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>

          {/* Call to Action in Reviews Section */}
          <div className="text-center mt-12 flex justify-center gap-4 flex-wrap">
            <a 
              href="https://search.google.com/local/reviews?placeid=ChIJiwavFRYu_0YRZ7-vcvHzh0M" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#3E797F] hover:bg-[#3E797F] px-6 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Read All Reviews
              <Star className="w-5 h-5" />
            </a>
            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJiwavFRYu_0YRZ7-vcvHzh0M" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#3E797F] hover:bg-[#706F6F] px-6 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Leave a Review
              <Star className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Recent Work & Social Proof */}
      <section className="py-20 bg-[#706F6F]/10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Recent</span> Transformations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="w-full h-[600px] md:h-[700px]">
              <iframe
                src="https://www.tiktok.com/embed/v2/7440110610072767776?autoplay=1&loop=1&rel=0&music_info=0&description=0&controls=0"
                style={{ width: '100%', height: '100%', maxWidth: '605px', minHeight: '700px' }}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="w-full h-[600px] md:h-[700px]">
              <iframe
                src="https://www.tiktok.com/embed/v2/7439728086691712288?autoplay=1&loop=1&rel=0&music_info=0&description=0&controls=0"
                style={{ width: '100%', height: '100%', maxWidth: '605px', minHeight: '700px' }}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="w-full h-[600px] md:h-[700px]">
              <iframe
                src="https://www.tiktok.com/embed/v2/7437948698501319968?autoplay=1&loop=1&rel=0&music_info=0&description=0&controls=0"
                style={{ width: '100%', height: '100%', maxWidth: '605px', minHeight: '700px' }}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Follow CTA */}
          <div className="text-center mt-12">
            <a 
              href="https://www.tiktok.com/@tevyservices" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#3E797F] hover:bg-[#3E797F]/90 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              See More Transformations
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3E797F]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">South West's Premier Mobile Wheel Repair Service</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional mobile wheel repairs across the South West, with same-day service and 24-hour 
            turnaround at our Marsh Barton facility. Quality service at your convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black hover:bg-[#706F6F] px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
              Book Mobile Service
            </button>
            <button className="bg-transparent border-2 border-black hover:bg-black/10 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
              Visit Our Workshop
            </button>
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section className="relative py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Get A</span>{" "}
            <span className="text-white">Free Quote</span>
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <p className="text-lg md:text-xl text-gray-300">
                Providing mobile wheel repair services across the South West, with our main facility located in Marsh Barton, Exeter.
              </p>
            </div>
            
            {/* Map Container */}
            <div className="w-full h-[600px] rounded-2xl overflow-hidden">
              <MapWrapper />
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                * Coverage area may vary. Please contact us for specific location availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm" id="contact">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Contact</span>{" "}
            <span className="text-white">Us</span>
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#3E797F] mt-1" />
                    <div>
                      <p className="font-semibold text-white">Call Us</p>
                      <a href={`tel:${contactInfo.phone}`} className="text-gray-300 hover:text-[#3E797F] transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#3E797F] mt-1" />
                    <div>
                      <p className="font-semibold text-white">Email Us</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-[#3E797F] transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#3E797F] mt-1" />
                    <div>
                      <p className="font-semibold text-white">Workshop Location</p>
                      <p className="text-gray-300">Marsh Barton, Exeter</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a href="#" className="text-[#3E797F] hover:text-white transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-[#3E797F] hover:text-white transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
                <h3 className="text-2xl font-bold text-white mb-6">Request a Quote</h3>
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
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 bg-black/40 border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#3E797F] hover:bg-[#3E797F]/80 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Wizard Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Get Your</span>{" "}
            <span className="text-white">Quote</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <p className="text-lg text-gray-300">
                Get an instant quote for your wheel refurbishment. Our step-by-step process makes it easy to specify exactly what you need.
              </p>
            </div>
            
            <DynamicQuoteWizard />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

const services: Service[] = [
  {
    title: "Diamond Cut Alloy Wheel Refurbishment",
    description: "State-of-the-art diamond cutting service at our Marsh Barton facility. We restore damaged alloy wheels to their original finish with precision and care.",
    icon: <Diamond className="w-8 h-8" />,
    availability: { garage: true, mobile: true }
  },
  {
    title: "Painted Alloys & Colour Changes",
    description: "Full wheel repainting service including colour changes and custom finishes. Perfect for updating your car's look or restoring wheels to factory finish.",
    icon: <Paintbrush className="w-8 h-8" />,
    availability: { garage: true, mobile: true }
  },
  {
    title: "Tyre Replacement",
    description: "Professional tyre fitting and replacement service. We supply and fit all major tyre brands, with competitive pricing and expert fitting at our Marsh Barton facility.",
    icon: <Disc className="w-8 h-8" />,
    availability: { garage: true, mobile: false }
  },
  {
    title: "Puncture Repairs",
    description: "Quick and reliable puncture repair service following British Standard guidelines. We assess, repair, and test to ensure your tyre is safe and roadworthy at our workshop.",
    icon: <Wrench className="w-8 h-8" />,
    availability: { garage: true, mobile: false }
  },
  {
    title: "TPMS Service & Diagnostic",
    description: "Complete tyre pressure monitoring solutions. We service and repair all types of TPMS systems to keep your vehicle safe and compliant at our Marsh Barton facility.",
    icon: <Gauge className="w-8 h-8" />,
    availability: { garage: true, mobile: false }
  }
]

const testimonials = [
  {
    name: "Neil Parker",
    text: "Used Tevy Services to repair a scuff to my Audi TT wheel. From first enquiry, Ellie was really helpful. Very professional service and excellent results.",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    name: "Michelle Medwin",
    text: "Great service, so impressed with repair to diamond cut alloy in several places. Honestly wouldn't have known it was ever there! Thanks Ellie 10 out of 10!!!",
    rating: 5,
    date: "3 months ago"
  },
  {
    name: "Zoe Egan",
    text: "I wouldn't go anywhere else!! Ellie and the team are amazing, very flexible and happy to help. They've turned our car around in 24 hours at short notice too - very honest and reliable.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Mike Lee Williams",
    text: "Tevy Services responded quickly to my initial message and they were able to fit me in at a very busy time. They arrived on time and worked quietly, quickly and cleanly. The wheel they refurbished is like new. Highly recommended.",
    rating: 5,
    date: "3 months ago"
  }
]

const transformations = [
  {
    title: "Diamond Cut Alloy Restoration",
    before: "/images/before_after/wheel_before_1.jpg",
    after: "/images/before_after/wheel_after_1.jpg"
  },
  {
    title: "Full Wheel Refurbishment",
    before: "/images/before_after/wheel_before_2.jpg",
    after: "/images/before_after/wheel_after_2.jpg"
  },
  {
    title: "Custom Color Change",
    before: "/images/before_after/wheel_before_3.jpg",
    after: "/images/before_after/wheel_after_3.jpg"
  }
]

type BadgeTooltipProps = {
  icon: React.ReactNode;
  label: string;
  tooltipText: string;
}

const BadgeTooltip = ({ icon, label, tooltipText }: BadgeTooltipProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative">
      <span 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-tevy-teal/10 border border-tevy-teal/20 text-tevy-teal hover:bg-tevy-teal/20 transition-colors duration-300 cursor-help"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
      >
        {icon}
        {label}
      </span>
      
      {isTooltipVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-tevy-teal/20 text-white text-sm shadow-xl z-10">
          {tooltipText}
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black/90 border-r border-b border-tevy-teal/20"></div>
        </div>
      )}
    </div>
  )
}

const ServiceCard = ({ service, className, style }: ServiceCardProps) => (
  <div 
    className={`bg-[#3E797F]/10 backdrop-blur-sm p-6 rounded-2xl border border-[#3E797F]/20 hover:border-[#3E797F] transition-all flex flex-col h-full group hover:bg-[#3E797F]/20 hover:transform hover:scale-[1.02] duration-300 ${className || ''}`}
    style={style}
  >
    <div className="text-[#3E797F] mb-4 transform group-hover:scale-110 transition-transform duration-300">
      <div className="w-10 h-10 flex items-center justify-center">
        {service.icon}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3 text-[#3E797F] group-hover:text-[#3E797F]/80 transition-colors duration-300">
      {service.title}
    </h3>
    <p className="text-gray-400 mb-4 flex-grow min-h-[60px] text-sm leading-relaxed">
      {service.description}
    </p>
    
    <div className="space-y-3">
      <div className="flex flex-row gap-2 items-center">
        {service.availability.garage && (
          <BadgeTooltip 
            icon={<Building2 className="w-4 h-4" />}
            label="Workshop Service"
            tooltipText="Available at our state-of-the-art Marsh Barton facility. Professional equipment and expert service in a controlled environment."
          />
        )}
        {service.availability.mobile && (
          <BadgeTooltip 
            icon={<Car className="w-4 h-4" />}
            label="Mobile Service"
            tooltipText="We come to you! Available across the South West. Perfect for convenience and emergency repairs at your location."
          />
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        <button 
          className="w-full bg-[#3E797F] hover:bg-[#3E797F]/80 px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          onClick={() => {/* Add quote/booking logic */}}
        >
          Get Free Quote
        </button>
        
        <button 
          className="w-full bg-transparent border border-[#3E797F] hover:bg-[#3E797F]/20 px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/button"
        >
          Learn More
          <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/button:translate-x-1" />
        </button>
      </div>
    </div>
  </div>
)