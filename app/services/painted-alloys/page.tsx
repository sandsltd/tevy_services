'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { COVERAGE_AREA } from '../../constants/coverage'
import { 
  Paintbrush, 
  Palette, 
  Shield, 
  Clock, 
  Car, 
  CheckCircle2,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram
} from 'lucide-react'
import { contactInfo } from '../../constants/contact'
import dynamic from 'next/dynamic'

const DynamicCoverageMap = dynamic(() => import('../../components/MapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-black/20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3E797F] border-t-transparent"></div>
    </div>
  )
})

const MARSH_BARTON: [number, number] = [-3.5239, 50.7070]

interface SearchResult {
  place_name: string
  center: [number, number]
}

type CoverageType = 'primary' | 'outside'

const getPopupContent = (location: string, coverage: CoverageType, coordinates: [number, number]) => {
  const distance = Math.round(turf.distance(MARSH_BARTON, coordinates, { units: 'kilometers' }))
  
  return `
    <div class="flex flex-col gap-4">
      <div>
        <h3 class="text-xl font-semibold">${location}</h3>
        <p class="text-sm text-gray-400">Distance from workshop: ${distance}km</p>
      </div>
      
      ${coverage === 'primary' ? `
        <div class="bg-[#3E797F]/20 p-3 rounded-lg">
          <p class="text-sm">✓ Within primary service area</p>
          <p class="text-sm">✓ Mobile service available</p>
          <p class="text-sm">✓ 3-week completion target</p>
        </div>
        
        <a href="#contact" class="inline-block px-4 py-2 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-sm text-white text-center transition-colors">
          Get Free Quote
        </a>
      ` : `
        <div class="bg-[#3E797F]/20 p-3 rounded-lg">
          <p class="text-sm">Custom service available for your location</p>
          <p class="text-sm text-gray-400">Contact us for tailored solutions</p>
        </div>
        
        <a href="#contact" class="inline-block px-4 py-2 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-sm text-white text-center transition-colors">
          Get Custom Quote
        </a>
      `}
    </div>
  `
}

// Add type definition
type CustomImageInterface = {
  width: number;
  height: number;
  data: Uint8Array;
  onAdd: () => void;
  render: () => boolean;
  context: CanvasRenderingContext2D | null;
}

const createPulsingMarker = (map: mapboxgl.Map): CustomImageInterface => {
  const size = 180
  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    context: null as CanvasRenderingContext2D | null,

    onAdd: function() {
      const canvas = document.createElement('canvas')
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext('2d')
    },

    render: function() {
      if (!this.context) return false;

      const duration = 2000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;

      // Draw outer circle
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.beginPath();
      this.context.arc(
        this.width / 2,
        this.height / 2,
        outerRadius,
        0,
        Math.PI * 2
      );
      this.context.fillStyle = `rgba(62, 121, 127, ${1 - t})`;
      this.context.fill();

      // Draw inner circle
      this.context.beginPath();
      this.context.arc(
        this.width / 2,
        this.height / 2,
        radius,
        0,
        Math.PI * 2
      );
      this.context.fillStyle = 'rgba(62, 121, 127, 1)';
      this.context.strokeStyle = 'white';
      this.context.lineWidth = 2 + 4 * (1 - t);
      this.context.fill();
      this.context.stroke();

      // Fix for the type error - create a new buffer with the correct type
      const imageData = this.context.getImageData(0, 0, this.width, this.height);
      const buffer = new Uint8Array(imageData.data.length);
      buffer.set(imageData.data);
      this.data = buffer;

      map.triggerRepaint();
      return true;
    }
  }

  return pulsingDot
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepairService",
  "name": "TEVY Services Alloy Wheel Painting",
  "image": "https://tevyservices.com/images/services/custom_alloy_wheel_painting_exeter.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Marsh Barton",
    "addressLocality": "Exeter",
    "postalCode": "EX2",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.7070,
    "longitude": -3.5239
  },
  "url": "https://tevyservices.com/services/painted-alloys",
  "telephone": "+44XXXXXXXXXX",
  "priceRange": "££",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "50"
  }
}

const getCurrentLocation = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.longitude, position.coords.latitude])
      },
      (error) => {
        reject(new Error('Could not get your location'))
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  })
}

const checkCoverage = (coordinates: [number, number]): CoverageType => {
  const point = turf.point(coordinates)
  const coverage = turf.booleanPointInPolygon(point, COVERAGE_AREA)
  return coverage ? 'primary' : 'outside'
}

const adjustMapView = (map: mapboxgl.Map, coords: [number, number], popup: mapboxgl.Popup) => {
  setTimeout(() => {
    const popupElement = document.querySelector('.mapboxgl-popup-content') as HTMLElement
    if (popupElement) {
      const popupHeight = popupElement.offsetHeight
      const mapHeight = map.getContainer().offsetHeight
      
      const verticalOffset = (mapHeight - popupHeight) / 2
      
      map.easeTo({
        center: [coords[0] - 0.1, coords[1]],
        zoom: 11,
        duration: 1000,
        padding: {
          top: Math.max(50, popupHeight / 2),
          bottom: Math.max(50, popupHeight / 2),
          left: 50,
          right: 50
        },
        offset: [150, -verticalOffset]
      })
    }
  }, 50)
}

export default function PaintedAlloys() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API!

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-4.2, 50.4],
      zoom: 8,
      attributionControl: false,
      pitch: 50,
      bearing: -10
    })

    // Wait for map to load before adding layers
    newMap.on('load', () => {
      // Add pulsing dot for workshop location
      const pulsingDot = createPulsingMarker(newMap)
      newMap.addImage('pulsing-dot', pulsingDot as any, { pixelRatio: 2 })

      // Add workshop marker
      newMap.addSource('workshop-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: MARSH_BARTON
          },
          properties: {}
        }
      })

      // Add coverage area
      newMap.addSource('coverage-area', {
        type: 'geojson',
        data: COVERAGE_AREA
      })

      // Add coverage area fill
      newMap.addLayer({
        id: 'coverage-gradient',
        type: 'fill',
        source: 'coverage-area',
        paint: {
          'fill-color': '#3E797F',
          'fill-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 0.1,
            9, 0.15,
            11, 0.2
          ]
        }
      })

      // Add coverage area border
      newMap.addLayer({
        id: 'coverage-border',
        type: 'line',
        source: 'coverage-area',
        paint: {
          'line-color': '#3E797F',
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 1,
            11, 2
          ],
          'line-opacity': 0.8,
          'line-blur': 3
        }
      })

      // Add workshop marker
      newMap.addLayer({
        id: 'workshop',
        type: 'symbol',
        source: 'workshop-point',
        layout: {
          'icon-image': 'pulsing-dot',
          'icon-allow-overlap': true
        }
      })

      // Fit map to coverage area
      const bounds = turf.bbox(COVERAGE_AREA)
      newMap.fitBounds([
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]]
      ], {
        padding: 50,
        pitch: 50,
        bearing: -10
      })
    })

    map.current = newMap

    return () => {
      map.current?.remove()
    }
  }, [])

  useEffect(() => {
    const currentMap = map.current
    if (!currentMap) return undefined

    const clickHandler = (e: mapboxgl.MapMouseEvent) => {
      const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat]
      const coverage = checkCoverage(coords)

      // Clear existing markers
      const markers = document.getElementsByClassName('mapboxgl-marker')
      while(markers.length > 0){
        markers[0].remove()
      }

      // Add marker at clicked location
      new mapboxgl.Marker({ color: '#3E797F' })
        .setLngLat(coords)
        .addTo(currentMap)

      // Remove existing popups
      const popups = document.getElementsByClassName('mapboxgl-popup')
      while(popups.length > 0){
        popups[0].remove()
      }

      const popupContent = document.createElement('div')
      popupContent.innerHTML = getPopupContent('Selected Location', coverage, coords)

      // Create and add popup
      const popup = new mapboxgl.Popup({
        closeButton: true,
        className: 'coverage-popup',
        closeOnClick: true,
        closeOnMove: false,
        offset: 25
      })
        .setLngLat(coords)
        .setDOMContent(popupContent)
        .addTo(currentMap)

      // Adjust view to show full popup
      adjustMapView(currentMap, coords, popup)
    }

    currentMap.on('click', clickHandler)

    return () => {
      currentMap.off('click', clickHandler)
    }
  }, [])

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `proximity=${MARSH_BARTON[0]},${MARSH_BARTON[1]}&` +
        `bbox=-5.5,49.8,-2.5,51.5&` + // Limit to South West England
        `types=address,place,locality,neighborhood&` +
        `access_token=${process.env.NEXT_PUBLIC_MAP_API}`
      )
      
      if (!response.ok) throw new Error('Search failed')
      
      const data = await response.json()
      setSearchResults(data.features)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocationSelect = async (result: SearchResult) => {
    setSearchQuery('')  // Clear the input
    setSearchResults([]) // Clear dropdown
    
    if (map.current) {
      // Clear existing markers
      const markers = document.getElementsByClassName('mapboxgl-marker')
      while(markers.length > 0){
        markers[0].remove()
      }

      // Add new marker
      const marker = new mapboxgl.Marker({ color: '#3E797F' })
        .setLngLat(result.center)
        .addTo(map.current)

      // Check if location is in coverage area
      const point = turf.point(result.center)
      const coverage = turf.booleanPointInPolygon(point, COVERAGE_AREA)

      // Create popup content
      const distance = Math.round(turf.distance(MARSH_BARTON, result.center, { units: 'kilometers' }))
      const popupContent = document.createElement('div')
      popupContent.innerHTML = `
        <div class="flex flex-col gap-4">
          <div>
            <h3 class="text-xl font-semibold">${result.place_name}</h3>
            <p class="text-sm text-gray-400">Distance from workshop: ${distance}km</p>
          </div>
          
          ${coverage ? `
            <div class="bg-[#3E797F]/20 p-3 rounded-lg">
              <p class="text-sm">✓ Within primary service area</p>
              <p class="text-sm">✓ Mobile service available</p>
              <p class="text-sm">✓ 3-week completion target</p>
            </div>
            
            <a href="#contact" class="inline-block px-4 py-2 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-sm text-white text-center transition-colors">
              Get Free Quote
            </a>
          ` : `
            <div class="bg-[#3E797F]/20 p-3 rounded-lg">
              <p class="text-sm">Custom service available for your location</p>
              <p class="text-sm text-gray-400">Contact us for tailored solutions</p>
            </div>
            
            <a href="#contact" class="inline-block px-4 py-2 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-sm text-white text-center transition-colors">
              Get Custom Quote
            </a>
          `}
        </div>
      `

      // Remove existing popups
      const popups = document.getElementsByClassName('mapboxgl-popup')
      while(popups.length > 0){
        popups[0].remove()
      }

      // Add popup
      new mapboxgl.Popup({
        className: 'premium-popup',
        maxWidth: '320px',
        closeButton: true,
        closeOnClick: false,
        anchor: 'bottom',
        offset: 25
      })
        .setLngLat(result.center)
        .setDOMContent(popupContent)
        .addTo(map.current)

      // Adjust map view
      map.current.easeTo({
        center: result.center,
        zoom: 11,
        duration: 1000
      })
    }
  }

  // Add this useEffect for debounced search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      return
    }

    const timer = setTimeout(() => {
      handleSearch(searchQuery)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/services/custom_alloy_wheel_painting_exeter.png"
            alt="Custom Alloy Wheel Painting in Exeter"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Trust Indicators */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                ))}
              </div>
              <span className="text-white/80 text-sm">Exeter's Trusted Wheel Specialists</span>
            </div>

            {/* SEO-Optimized H1 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-white">Professional</span>
              <span className="block text-[#3E797F]">Alloy Painting</span>
              <span className="block text-2xl md:text-3xl font-normal text-gray-400 mt-4">
                Expert Colour Changes & Custom Finishes in Exeter
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Transform your vehicle's appearance with our professional wheel painting service. 
              From subtle refinements to bold statements, we deliver flawless finishes that last.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-lg font-semibold transition-colors"
              >
                Get Free Quote
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="#process" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg text-lg font-semibold transition-colors backdrop-blur-sm"
              >
                Our Process
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left column */}
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  <span className="text-[#3E797F]">Professional</span>{" "}
                  <span className="text-white">Wheel Painting</span>
                </h2>
                
                <p className="text-gray-300 text-lg mb-8">
                  Transform your vehicle's alloy wheels with our professional painting service. Using the latest techniques and high-quality materials, we deliver exceptional results that not only enhance your car's appearance but also protect your wheels from corrosion and damage.
                </p>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Why Choose Our Service?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="text-[#3E797F]">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="text-lg">Multiple layers of primer for superior paint adhesion</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="text-[#3E797F]">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="text-lg">Environmentally friendly painting process with low VOC emissions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="text-[#3E797F]">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="text-lg">Professional colour matching for perfect results</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="text-[#3E797F]">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="text-lg">Quality finish guaranteed to manufacturer standards</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-6">
                {/* TikTok Video */}
                <div className="relative w-full max-w-[280px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden">
                  <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="/images/services/painted_alloy_before_after.mp4" type="video/mp4" />
                  </video>
                </div>

                {/* Completed wheel image */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/services/painted_alloy.jpg"
                    alt="Professionally Painted Alloy Wheel"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 bg-black z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Custom Colours",
                description: "Choose from our extensive range of colors or let us match any specific shade you desire."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Premium Finish",
                description: "Our advanced painting techniques ensure a durable, showroom-quality finish."
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Quick Turnaround",
                description: "Professional service with fast turnaround times to get you back on the road."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-2xl p-8 hover:bg-[#3E797F]/10 
                  transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(62,121,127,0.2)]
                  backdrop-blur-sm"
              >
                <div className="text-[#3E797F] mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process Section */}
      <section id="process" className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Our Professional</span> Process
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                {[
                  {
                    title: "Wheel Preparation",
                    description: "Thorough cleaning and surface preparation, removing all contaminants and old finishes for perfect paint adhesion.",
                    steps: [
                      "Deep cleaning to remove brake dust and road grime",
                      "Surface inspection for damage assessment",
                      "Careful masking of tires and components"
                    ]
                  },
                  {
                    title: "Professional Priming",
                    description: "Application of high-quality primers specifically designed for alloy wheels.",
                    steps: [
                      "Multiple layers of primer for durability",
                      "Proper curing between coats",
                      "Surface smoothing for perfect finish"
                    ]
                  },
                  {
                    title: "Expert Paint Application",
                    description: "Using premium automotive-grade paints for a lasting finish.",
                    steps: [
                      "Even application of base coat",
                      "Color matching to your specifications",
                      "Quality control checks between layers"
                    ]
                  },
                  {
                    title: "Protective Clear Coat",
                    description: "Final protective layer for durability and shine.",
                    steps: [
                      "UV-resistant clear coat application",
                      "Multiple layers for maximum protection",
                      "Professional quality inspection"
                    ]
                  }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3E797F] flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-400 mb-3">{step.description}</p>
                        <ul className="space-y-2">
                          {step.steps.map((subStep, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1 h-1 rounded-full bg-[#3E797F]" />
                              {subStep}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-8">
                <div className="relative h-[600px] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/services/alloy_painting_prep.jpg"
                    alt="Professional Wheel Painting Process"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
                  <p className="text-gray-300">
                    Every wheel we paint undergoes rigorous quality control checks to ensure perfect finish and long-lasting durability. Our work is fully guaranteed for your peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Service</span>{" "}
            <span className="text-white">Coverage Area</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            We offer mobile wheel painting services across the South West, with our main facility located in Marsh Barton, Exeter.
          </p>

          <div className="max-w-5xl mx-auto">
            {/* Map Container */}
            <div className="w-full h-[600px] rounded-2xl overflow-hidden">
              <DynamicCoverageMap />
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Workshop Service</h3>
                  <p className="text-sm text-gray-400">Full wheel painting service at our Marsh Barton facility</p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Mobile Service</h3>
                  <p className="text-sm text-gray-400">Available within 45-mile radius for wheel collection</p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Free Collection</h3>
                  <p className="text-sm text-gray-400">Free collection & delivery for full sets</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 text-center mt-6">
                * Coverage area may vary. Please contact us for specific location availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Customer</span> Reviews
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "James H.",
                location: "Exeter",
                text: "Absolutely fantastic service. My alloys look better than new - the finish is perfect and the attention to detail is outstanding.",
                rating: 5,
                date: "2 weeks ago"
              },
              {
                name: "Sarah M.",
                location: "Plymouth",
                text: "Professional service from start to finish. They matched the color perfectly and the turnaround time was impressive.",
                rating: 5,
                date: "1 month ago"
              },
              {
                name: "Mike R.",
                location: "Torquay",
                text: "Great value for money. The quality of work is exceptional and they were very accommodating with timing.",
                rating: 5,
                date: "3 weeks ago"
              }
            ].map((review, index) => (
              <div 
                key={index}
                className="bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#3E797F] fill-[#3E797F]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{review.text}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-gray-400">{review.location}</p>
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Before</span> & After
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <Image
                      src={`/images/gallery/before-${item}.jpg`}
                      alt="Before Wheel Restoration"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-sm">
                      Before
                    </div>
                  </div>
                  <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <Image
                      src={`/images/gallery/after-${item}.jpg`}
                      alt="After Wheel Restoration"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-[#3E797F]/70 px-2 py-1 rounded text-sm">
                      After
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Complete wheel restoration and custom paint finish
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Guide */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Pricing</span> Guide
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Standard",
                price: "From £80",
                description: "Per wheel",
                features: [
                  "Single colour finish",
                  "Full preparation",
                  "Professional application",
                  "Clear coat protection"
                ]
              },
              {
                name: "Premium",
                price: "From £100",
                description: "Per wheel",
                features: [
                  "Custom colour matching",
                  "Diamond cut effect",
                  "Multi-layer application",
                  "Enhanced protection",
                  "12-month guarantee"
                ],
                highlighted: true
              },
              {
                name: "Custom",
                price: "Contact us",
                description: "Bespoke finishes",
                features: [
                  "Special effect finishes",
                  "Two-tone designs",
                  "Bespoke patterns",
                  "Premium protection",
                  "Extended guarantee"
                ]
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`
                  relative p-8 rounded-2xl border backdrop-blur-sm
                  ${plan.highlighted 
                    ? 'border-[#3E797F] bg-[#3E797F]/10' 
                    : 'border-[#3E797F]/20 bg-black/20'
                  }
                `}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3E797F] px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-2">{plan.description}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`
                    mt-6 block px-6 py-3 text-center rounded-lg transition-colors
                    ${plan.highlighted
                      ? 'bg-[#3E797F] hover:bg-[#3E797F]/80'
                      : 'bg-white/10 hover:bg-white/20'
                    }
                  `}
                >
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Options */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Colour</span> Options
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Gloss Black",
              "Shadow Chrome",
              "Gunmetal Grey",
              "Bronze Gold",
              "Candy Red",
              "Pearl White",
              "Midnight Blue",
              "Custom Colors"
            ].map((color, index) => (
              <div 
                key={index}
                className="aspect-square relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={`/images/colors/${color.toLowerCase().replace(' ', '-')}.jpg`} // You'll need these images
                  alt={color}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-semibold">{color}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3E797F]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Wheels?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch today for a free quote and consultation. Our expert team is ready to help you
            achieve the perfect look for your vehicle.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-black hover:bg-black/80 rounded-lg text-lg font-semibold transition-colors"
          >
            Get Started
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
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

      <Footer />

      <div className="fixed top-0 left-0 w-full h-1 bg-[#3E797F]/20">
        <div 
          className="h-full bg-[#3E797F]" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </main>
  )
} 