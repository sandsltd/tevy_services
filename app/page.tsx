'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
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
  ChevronDown, 
  Truck, 
  CheckCircle2 
} from 'lucide-react'
import { contactInfo } from './constants/contact'
import Footer from './components/Footer'
import { useReversibleVideo } from './hooks/useReversibleVideo'
import dynamic from 'next/dynamic'
import MapWrapper from './components/MapWrapper'
import Link from 'next/link'

type ServiceAvailability = {
  garage: boolean;
  mobile: boolean;
}

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  availability: ServiceAvailability;
  path: string;
}

type ServiceCardProps = {
  service: Service;
  className?: string;
  style?: React.CSSProperties;
}

function useVideoPlayState() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const handlePlayClick = useCallback(() => {
    setIsPlaying(true);
    
    // Try to programmatically click the Vimeo play button
    if (iframeRef.current) {
      // First approach: try to send a play command via postMessage
      try {
        const contentWindow = iframeRef.current.contentWindow;
        if (contentWindow) {
          contentWindow.postMessage('{"method":"play"}', '*');
        }
      } catch (e) {
        console.error("Failed to send play command to iframe", e);
      }
      
      // Second approach: try to simulate a click in the center of the iframe
      try {
        // Create and dispatch a click event on the iframe
        const rect = iframeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: centerX,
          clientY: centerY
        });
        
        iframeRef.current.dispatchEvent(clickEvent);
      } catch (e) {
        console.error("Failed to simulate click on iframe", e);
      }
    }
  }, []);
  
  return { isPlaying, handlePlayClick, iframeRef };
}

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { videoRef, overlayVideoRef } = useReversibleVideo()
  const { isPlaying: isWelcomeVideoPlaying, handlePlayClick: handleWelcomePlayClick, iframeRef: welcomeVideoRef } = useVideoPlayState();
  const { isPlaying: isServicesVideoPlaying, handlePlayClick: handleServicesPlayClick, iframeRef: servicesVideoRef } = useVideoPlayState();
  const { isPlaying: isContactVideoPlaying, handlePlayClick: handleContactPlayClick, iframeRef: contactVideoRef } = useVideoPlayState();

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
        {/* Background container with parallax and subtle animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 scale-110" ref={parallaxRef}> 
            {/* Replace Image with Vimeo iframe - fixed for mobile fullscreen */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  padding: 0,
                  overflow: 'hidden'
                }}>
                  <iframe 
                    src="https://player.vimeo.com/video/1062772590?h=88cba384e5&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&quality=auto&dnt=1" 
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%'
                    }} 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                    title="hero"
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Enhanced gradient overlays with animation - strengthened for mobile */}
            <div className="absolute inset-0 -bottom-8 bg-gradient-to-r from-black/80 md:from-black/70 via-black/50 md:via-black/40 to-transparent animate-fade-in" />
            <div className="absolute inset-0 -bottom-8 bg-gradient-to-b from-transparent via-black/60 md:via-black/50 to-black animate-fade-in delay-300" />
            
            {/* Add subtle floating particles */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute w-2 h-2 bg-[#3E797F] rounded-full animate-float-1" style={{ top: '20%', left: '10%' }} />
              <div className="absolute w-2 h-2 bg-[#3E797F] rounded-full animate-float-2" style={{ top: '60%', left: '80%' }} />
              <div className="absolute w-2 h-2 bg-[#3E797F] rounded-full animate-float-3" style={{ top: '40%', left: '60%' }} />
            </div>
          </div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 animate-fade-in mt-[100px] md:mt-[80px]">
            <div className="max-w-4xl">
              {/* Trust Badge with slightly increased spacing */}
              <div className="flex items-center gap-3 mb-6 animate-fade-in-up mt-[80px] md:mt-[60px]">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 text-[#3E797F] fill-[#3E797F] animate-star-wave`}
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-white/80 text-sm">5.0 on Google</span>
              </div>

              <h1 className="mb-4">
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
                Specialists in diamond cut restoration, with additional services including custom paint finishes and wheel repairs. Professional service at your location or our Marsh Barton facility.
              </p>

              {/* Service Types */}
              <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in-up delay-300">
                <div className="p-4 bg-black/40 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg">
                  <h3 className="font-bold flex items-center gap-2 text-[#3E797F]">
                    <Truck className="w-5 h-5" />
                    Mobile Service
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">We come to you across the South West</p>
                </div>
                <div className="p-4 bg-black/40 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg">
                  <h3 className="font-bold flex items-center gap-2 text-[#3E797F]">
                    <Car className="w-5 h-5" />
                    Collection Service
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">We collect and deliver your wheels</p>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
                <button 
                  onClick={() => {
                    const coverageSection = document.getElementById('coverage');
                    if (coverageSection) {
                      coverageSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="group relative bg-[#3E797F] px-10 py-5 rounded-lg text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 min-w-[280px] overflow-hidden hover:shadow-[0_0_30px_rgba(62,121,127,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative z-10">Get Your Free Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                </button>

                <button 
                  onClick={() => {
                    const coverageSection = document.getElementById('coverage');
                    if (coverageSection) {
                      coverageSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="group bg-black/40 backdrop-blur-sm px-10 py-5 rounded-lg text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 border border-[#3E797F]/20 hover:border-[#3E797F] min-w-[280px] hover:bg-black/60"
                >
                  <span className="relative z-10">Check Coverage</span>
                  <MapPin className="w-5 h-5 animate-bounce relative z-10" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Video Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              <span className="text-white">Welcome to </span>
              <span className="text-[#3E797F]">TEVY Services</span>
            </h2>
            
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(62,121,127,0.2)] border border-[#3E797F]/20 group">
              <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
                <iframe 
                  ref={welcomeVideoRef}
                  src="https://player.vimeo.com/video/1062759053?h=f938cadcae&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=welcome-video&amp;app_id=58479&amp;dnt=1&amp;transparent=1&amp;color=3E797F&amp;background=0&amp;muted=0&amp;controls=1" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                  style={{
                    position:'absolute', 
                    top:0, 
                    left:0, 
                    width:'100%', 
                    height:'100%',
                    backgroundColor: 'black'
                  }} 
                  title="Intro"
                ></iframe>
              </div>
              
              {/* Custom play button overlay with click handler - Enhanced version */}
              {!isWelcomeVideoPlaying && (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/90 hover:bg-black/80 transition-all duration-300"
                  onClick={handleWelcomePlayClick}
                >
                  <div className="w-24 h-24 bg-[#3E797F] rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(62,121,127,0.5)] animate-pulse">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="mt-6 bg-[#3E797F]/20 px-6 py-3 rounded-full border border-[#3E797F] animate-bounce-slow">
                    <span className="text-white text-xl font-semibold">Watch Video</span>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 pointer-events-none border-[3px] border-[#3E797F]/0 hover:border-[#3E797F]/20 transition-all duration-500 rounded-2xl"></div>
            </div>
            
            <div className="flex justify-center mt-8">
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
                className="flex items-center gap-2 bg-[#3E797F]/10 hover:bg-[#3E797F]/20 px-6 py-3 rounded-full text-[#3E797F] font-medium transition-all"
              >
                Explore Our Services
                <ChevronDown className="w-5 h-5 animate-bounce-slow" />
              </button>
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
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                service={service}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Video Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              <span className="text-white">Our </span>
              <span className="text-[#3E797F]">Service Range</span>
            </h2>
            
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(62,121,127,0.2)] border border-[#3E797F]/20 group">
              <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
                <iframe 
                  ref={servicesVideoRef}
                  src="https://player.vimeo.com/video/1062758602?h=290e210521&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=services-video&amp;app_id=58479&amp;dnt=1&amp;transparent=1&amp;color=3E797F&amp;background=0&amp;muted=0&amp;controls=1" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                  style={{
                    position:'absolute', 
                    top:0, 
                    left:0, 
                    width:'100%', 
                    height:'100%',
                    backgroundColor: 'black'
                  }} 
                  title="Services"
                ></iframe>
              </div>
              
              {/* Custom play button overlay with click handler */}
              {!isServicesVideoPlaying && (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black"
                  onClick={handleServicesPlayClick}
                >
                  <div className="w-20 h-20 bg-[#3E797F]/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg mb-4">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium">Click to Play</span>
                </div>
              )}
              
              <div className="absolute inset-0 pointer-events-none border-[3px] border-[#3E797F]/0 hover:border-[#3E797F]/20 transition-all duration-500 rounded-2xl"></div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button 
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="flex items-center gap-2 bg-[#3E797F]/10 hover:bg-[#3E797F]/20 px-6 py-3 rounded-full text-[#3E797F] font-medium transition-all"
              >
                Learn More About Us
                <ChevronDown className="w-5 h-5 animate-bounce-slow" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-[#706F6F]/10">
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
                  <span>Fast Service Times</span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 mt-8 mb-8">
                <div className="text-center p-4 bg-black/30 rounded-xl border border-[#3E797F]/20 hover:border-[#3E797F] transition-all">
                  <div className="text-3xl font-bold text-[#3E797F] mb-2">3000+</div>
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
              <button 
                onClick={() => {
                  const coverageSection = document.getElementById('coverage');
                  if (coverageSection) {
                    coverageSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="w-full bg-[#3E797F] hover:bg-[#3E797F]/90 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Get a Free Quote
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
              <div className="text-4xl font-bold text-[#3E797F] mb-2">1000+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3E797F] mb-2">3000+</div>
              <div className="text-gray-400">Wheels Restored</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3E797F] mb-2">Quick</div>
              <div className="text-gray-400">Turnaround Times</div>
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
            {[
              '/images/services/beforeafter_tevyservces_alloywheels.mp4',
              '/images/services/beforeafter_tevyservces_alloywheels_2.mp4',
              '/images/services/beforeafter_tevyservces_alloywheels_3.mp4'
            ].map((videoSrc, index) => (
              <div key={index} className="w-full h-[600px] md:h-[700px] relative rounded-xl overflow-hidden bg-black/20">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </div>
            ))}
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

      {/* Coverage Area Section */}
      <section id="coverage" className="relative py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
              ))}
            </div>
            <span className="text-white/80 text-sm">5.0 on Google</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-white">Get Your</span>{" "}
            <span className="text-[#3E797F]">Free Quote</span>
          </h2>
          
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-gray-300 mb-4">
              Click the map to get an instant quote
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3E797F]" />
                <span>Instant pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3E797F]" />
                <span>Check coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3E797F]" />
                <span>Mobile & collection options</span>
              </div>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="w-full h-[600px] rounded-2xl overflow-hidden">
            <MapWrapper />
          </div>
          
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-400">
              * Coverage area includes Exeter, Teignmouth, Torquay and surrounding areas
            </p>
            <p className="text-sm text-[#3E797F]">
              Click anywhere on the map to check coverage and get a quote
            </p>
          </div>
        </div>
      </section>

      {/* Contact Video Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="text-white">How to </span>
              <span className="text-[#3E797F]">Contact Us</span>
            </h2>
            
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(62,121,127,0.2)] border border-[#3E797F]/20 group mb-8">
              <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
                <iframe 
                  ref={contactVideoRef}
                  src="https://player.vimeo.com/video/1062809525?h=6701e7b6ec&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=contact-video&amp;app_id=58479&amp;dnt=1&amp;transparent=1&amp;color=3E797F&amp;background=0&amp;muted=0&amp;controls=1" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                  style={{
                    position:'absolute', 
                    top:0, 
                    left:0, 
                    width:'100%', 
                    height:'100%',
                    backgroundColor: 'black'
                  }} 
                  title="Contact Us"
                ></iframe>
              </div>
              
              {/* Custom play button overlay with click handler */}
              {!isContactVideoPlaying && (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black"
                  onClick={handleContactPlayClick}
                >
                  <div className="w-20 h-20 bg-[#3E797F]/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg mb-4">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium">Click to Play</span>
                </div>
              )}
              
              <div className="absolute inset-0 pointer-events-none border-[3px] border-[#3E797F]/0 hover:border-[#3E797F]/20 transition-all duration-500 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Still have questions? CTA */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-black/20 border border-[#3E797F]/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Still Have Questions?</h3>
            
            <p className="text-gray-400 mb-8 text-center">
              Our wheel specialists are here to help. Get expert advice about your specific requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:07572634898" 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Call Us Now</span>
              </a>
              
              <button 
                onClick={() => {
                  const coverageSection = document.getElementById('coverage');
                  if (coverageSection) {
                    coverageSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <MapPin className="w-5 h-5" />
                <span>Get a Quote</span>
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Response within 2 hours</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>No obligation quote</span>
              </div>
            </div>
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
    title: "Diamond Cut Refurbishment",
    description: "State-of-the-art CNC lathe diamond cutting service at our Marsh Barton facility. We restore damaged alloy wheels to their original factory finish with precision and care.",
    icon: <Diamond className="w-8 h-8" />,
    availability: { garage: true, mobile: true },
    path: "/services/diamond-cut"
  },
  {
    title: "Painted Alloys & Colour Changes",
    description: "Full wheel repainting service including custom colour changes and finishes. Perfect for updating your car's look or restoring wheels to factory finish.",
    icon: <Paintbrush className="w-8 h-8" />,
    availability: { garage: true, mobile: true },
    path: "/services/painted-alloys"
  },
  {
    title: "Tyre Replacement",
    description: "Professional tyre fitting and replacement service. We supply and fit all major tyre brands, with competitive pricing and expert fitting at our Marsh Barton facility.",
    icon: <Disc className="w-8 h-8" />,
    availability: { garage: true, mobile: false },
    path: "/services/tyre-replacment"
  },
  {
    title: "Tyre Repair",
    description: "Quick and reliable puncture repair service following British Standard guidelines. We assess, repair, and test to ensure your tyre is safe and roadworthy.",
    icon: <Wrench className="w-8 h-8" />,
    availability: { garage: true, mobile: false },
    path: "/services/tyre-repair"
  },
  {
    title: "TPMS Service",
    description: "Complete tyre pressure monitoring solutions. We diagnose, repair, and program all types of TPMS systems to keep your vehicle safe and compliant.",
    icon: <Gauge className="w-8 h-8" />,
    availability: { garage: true, mobile: false },
    path: "/services/tpms"
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
          onClick={() => {
            const coverageSection = document.getElementById('coverage');
            if (coverageSection) {
              coverageSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }}
        >
          Get Free Quote
        </button>
        
        <Link 
          href={service.path}
          className="w-full bg-transparent border border-[#3E797F] hover:bg-[#3E797F]/20 px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/button"
        >
          Learn More
          <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/button:translate-x-1" />
        </Link>
      </div>
    </div>
  </div>
)