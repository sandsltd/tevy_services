'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MOBILE_COVERAGE, WHEEL_COLLECTION_COVERAGE } from '../constants/coverage'
import { MapPin, Check, ArrowRight } from 'lucide-react'
import * as turf from '@turf/turf'
import ServiceBooking from './ServiceBooking'

const MARSH_BARTON: [number, number] = [-3.5239, 50.7070]
const PRIMARY_RADIUS = 45 // 45km primary zone
const SECONDARY_RADIUS = 65 // 65km secondary zone

// Add this type definition at the top of your file
type CustomImageInterface = {
  width: number;
  height: number;
  data: Uint8Array;
  onAdd: () => void;
  render: () => boolean;
}

// Then modify the createPulsingMarker function
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

// Add this helper function at the top of the file
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Update coverage checking function
const checkCoverage = (coordinates: [number, number]): CoverageType[] => {
  const point = turf.point(coordinates)
  const coverageAreas: CoverageType[] = []
  
  if (turf.booleanPointInPolygon(point, MOBILE_COVERAGE)) {
    coverageAreas.push('mobile')
  }
  if (turf.booleanPointInPolygon(point, WHEEL_COLLECTION_COVERAGE)) {
    coverageAreas.push('wheel-collection')
  }
  
  return coverageAreas.length > 0 ? coverageAreas : ['outside']
}

// Update CoverageType
type CoverageType = 'mobile' | 'wheel-collection' | 'outside'

// Add these animations to the popupStyle constant
const popupStyle = `
  @keyframes popup-bounce {
    0% { transform: translateY(10px); opacity: 0; }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes marker-drop {
    0% { transform: translateY(-200px); }
    60% { transform: translateY(20px); }
    80% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }

  @keyframes marker-pulse {
    0% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.5);
      opacity: 0;
    }
    100% { 
      transform: scale(1);
      opacity: 1;
    }
  }

  .mapboxgl-popup {
    animation: popup-bounce 0.5s ease-out;
  }

  .mapboxgl-popup-content {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(62, 121, 127, 0.3);
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .mapboxgl-marker {
    animation: marker-drop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .mapboxgl-marker::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: rgba(62, 121, 127, 0.3);
    border-radius: 50%;
    z-index: -1;
    animation: marker-pulse 2s ease-in-out infinite;
  }

  @media (max-width: 640px) {
    .mapboxgl-popup {
      max-width: 85vw !important;
      width: 85vw !important;
      position: fixed !important;
      bottom: 85px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      animation: popup-bounce 0.5s ease-out;
    }
  }
`

// Update the getPopupContent function
const getPopupContent = (location: string, coverageTypes: CoverageType[], coordinates: [number, number]) => {
  const distanceMiles = Math.round(turf.distance(MARSH_BARTON, coordinates, { units: 'kilometers' }) * 0.621371)
  const isMobile = window.innerWidth < 640
  
  const driveTimeMinutes = Math.round((distanceMiles / 40) * 60)
  const driveTimeText = driveTimeMinutes > 60 
    ? `${Math.floor(driveTimeMinutes / 60)}h ${driveTimeMinutes % 60}m`
    : `${driveTimeMinutes}m`

  const servicesContent = coverageTypes.map(type => {
    if (type === 'wheel-collection') {
      return `
        <div class="p-2 border border-[#3E797F]/20 rounded-lg">
          <div class="flex items-center gap-2 text-[#3E797F]">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <h4 class="text-sm font-bold">Collection & Delivery Available</h4>
          </div>
          <div class="mt-1 pl-6 text-xs text-gray-400">
            • Wheel Collection for Diamond Cutting
            • Tyre Collection & Delivery Service
          </div>
        </div>
      `
    }

    if (type === 'mobile') {
      return `
        <div class="p-2 border border-[#3E797F]/20 rounded-lg">
          <div class="flex items-center gap-2 text-[#3E797F]">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <h4 class="text-sm font-bold">Mobile Service Available</h4>
          </div>
          <div class="mt-1 pl-6 text-xs text-gray-400">
            • On-site Diamond Cut Repairs
            • Mobile Wheel Polishing
          </div>
        </div>
      `
    }

    return `
      <div class="p-2 border border-[#3E797F]/20 rounded-lg">
        <div class="flex items-center gap-2 text-[#3E797F]">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h4 class="text-sm font-bold">Outside Service Area</h4>
        </div>
        <div class="mt-1 pl-6 text-xs text-gray-400">
          Contact us to discuss options
        </div>
      </div>
    `
  }).join('')

  return `
    <div class="flex flex-col gap-2">
      <div>
        <h2 class="text-base font-bold text-white mb-2">${location}</h2>
        <div class="flex items-center gap-3 text-xs text-gray-400">
          <div class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-[#3E797F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${distanceMiles}mi</span>
          </div>
          <div class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-[#3E797F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${driveTimeText}</span>
          </div>
        </div>
      </div>
      ${servicesContent}
      <button
        id="getQuoteBtn"
        data-location="${location}"
        data-distance="${distanceMiles}"
        data-services='${JSON.stringify(coverageTypes)}'
        class="w-full px-3 py-2 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-bold text-sm transition-colors mt-1"
      >
        Get Quote
      </button>
    </div>
  `
}

// Add this CSS animation at the top of the file after the imports
const pulsingDotStyle = `
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
`

export default function CoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showInitialOverlay, setShowInitialOverlay] = useState(true)
  const [showQuoteCalculator, setShowQuoteCalculator] = useState(false)
  const [quoteLocation, setQuoteLocation] = useState<{
    name: string
    distance: number
    services: CoverageType[]
  } | null>(null)

  // Move handleSearch before debouncedSearch
  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `proximity=${MARSH_BARTON[0]},${MARSH_BARTON[1]}&` +
        `proximity_bias=false&` +
        `types=postcode,place,locality,neighborhood&` +
        `country=gb&` +
        `limit=5&` +
        `access_token=${process.env.NEXT_PUBLIC_MAP_API}`
      )
      
      if (!response.ok) throw new Error('Search failed')
      
      const data = await response.json()
      setSearchResults(data.features)
    } catch (error) {
      console.error('Search failed:', error)
      setErrorMessage('Search failed. Please try again.')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Now create debouncedSearch after handleSearch is defined
  const debouncedSearch = debounce(handleSearch, 300)

  useEffect(() => {
    if (!mapContainer.current) return

    try {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API || ''

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [MARSH_BARTON[0], MARSH_BARTON[1] + 0.04],
        zoom: 9,
        attributionControl: false,
        pitch: 50,
        bearing: -10,
        renderWorldCopies: false
      })

      newMap.on('load', () => {
        console.log('Map loaded successfully')
        
        try {
          // Add mobile service coverage area
          newMap.addSource('mobile-coverage', {
            type: 'geojson',
            data: MOBILE_COVERAGE
          })

          // Add collection/delivery coverage area
          newMap.addSource('collection-coverage', {
            type: 'geojson',
            data: WHEEL_COLLECTION_COVERAGE
          })

          // Add mobile coverage area fill
          newMap.addLayer({
            id: 'mobile-coverage-fill',
            type: 'fill',
            source: 'mobile-coverage',
            paint: {
              'fill-color': '#3E797F',
              'fill-opacity': 0.2
            }
          })

          // Add mobile coverage area border
          newMap.addLayer({
            id: 'mobile-coverage-border',
            type: 'line',
            source: 'mobile-coverage',
            paint: {
              'line-color': '#3E797F',
              'line-width': 2,
              'line-opacity': 0.8,
              'line-blur': 3
            }
          })

          // Add collection coverage area fill
          newMap.addLayer({
            id: 'collection-coverage-fill',
            type: 'fill',
            source: 'collection-coverage',
            paint: {
              'fill-color': '#FF6B6B',
              'fill-opacity': 0.2
            }
          })

          // Add collection coverage area border
          newMap.addLayer({
            id: 'collection-coverage-border',
            type: 'line',
            source: 'collection-coverage',
            paint: {
              'line-color': '#7F3E3E',
              'line-width': 2,
              'line-opacity': 0.8,
              'line-blur': 3
            }
          })

          // Add pulsing dot after layers
          const pulsingDot = createPulsingMarker(newMap)
          newMap.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })

          // Add a point source for the workshop location
          newMap.addSource('workshop', {
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

          // Add the pulsing dot layer
          newMap.addLayer({
            id: 'workshop-location',
            type: 'symbol',
            source: 'workshop',
            layout: {
              'icon-image': 'pulsing-dot',
              'icon-allow-overlap': true
            }
          })

          console.log('Layers added successfully')
        } catch (err) {
          console.error('Error adding layers:', err)
        }
      })

      map.current = newMap

      return () => {
        map.current?.remove()
      }
    } catch (error) {
      console.error('Map initialization error:', error)
    }
  }, [])

  // Replace the popup click handler with this simpler version
  useEffect(() => {
    const handleQuoteClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === 'getQuoteBtn') {
        const btn = target as HTMLButtonElement;
        setQuoteLocation({
          name: btn.dataset.location || '',
          distance: parseInt(btn.dataset.distance || '0'),
          services: JSON.parse(btn.dataset.services || '[]')
        });
        setShowQuoteCalculator(true);
      }
    };

    document.addEventListener('click', handleQuoteClick);
    return () => document.removeEventListener('click', handleQuoteClick);
  }, []);

  // Memoize the click handler
  const handleLocationSelect = useCallback((result: any) => {
    if (!map.current || !result.center) return
    
    const [lng, lat] = result.center
    const coordinates: [number, number] = [lng, lat]
    
    // Clear existing markers
    const markers = document.getElementsByClassName('mapboxgl-marker')
    Array.from(markers).forEach(marker => marker.remove())

    // Add new marker
    new mapboxgl.Marker({
      element: (() => {
        const el = document.createElement('div')
        el.className = 'mapboxgl-marker'
        el.style.cssText = `
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #8B5CF6;
          border: 2px solid white;
          position: relative;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
        `
        
        // Create a wrapper for the pulse effect
        const pulseWrapper = document.createElement('div')
        pulseWrapper.className = 'marker-pulse-wrapper'
        pulseWrapper.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        `
        
        el.appendChild(pulseWrapper)
        return el
      })()
    })
      .setLngLat(coordinates)
      .addTo(map.current)

    // Remove existing popups
    const popups = document.getElementsByClassName('mapboxgl-popup')
    Array.from(popups).forEach(popup => popup.remove())

    // Check coverage and create popup
    const coverage = checkCoverage(coordinates)
    const popupContent = document.createElement('div')
    popupContent.innerHTML = getPopupContent(result.place_name, coverage, coordinates)

    // Add popup
    new mapboxgl.Popup({
      closeButton: true,
      className: 'coverage-popup custom-dark-popup',
      maxWidth: window.innerWidth < 640 ? '90vw' : '320px',
      offset: [0, -15],
      anchor: 'bottom',
      focusAfterOpen: false
    })
      .setLngLat(coordinates)
      .setDOMContent(popupContent)
      .addTo(map.current)

    // Adjust map view based on screen size
    const isMobile = window.innerWidth < 640

    // Calculate offsets for both latitude and longitude
    const offsetLat = lat + (isMobile ? 0.08 : 0.06)
    const offsetLng = lng - (isMobile ? 0.01 : 0.07) // Changed to negative to move left
    
    map.current.flyTo({
      center: [offsetLng, offsetLat],
      zoom: isMobile ? 10 : 11,
      duration: 2000,
      padding: {
        top: isMobile ? 50 : 100,
        bottom: isMobile ? 400 : 300,
        left: isMobile ? 20 : 200,
        right: isMobile ? 20 : 200
      }
    })

    // Clear search
    setSearchResults([])
    setSearchQuery('')
  }, [map])

  return (
    <div className="relative">
      <style>
        {`
          .custom-dark-popup .mapboxgl-popup-content {
            background: rgba(0, 0, 0, 0.95) !important;
            color: white !important;
            max-height: 400px !important;  /* Fixed height */
            overflow-y: auto !important;   /* Enable scrolling */
          }
          .custom-dark-popup .mapboxgl-popup-tip {
            border-top-color: rgba(0, 0, 0, 0.95) !important;
            border-bottom-color: rgba(0, 0, 0, 0.95) !important;
          }
        `}
      </style>
      
      {/* Search Box */}
      <div className="absolute top-4 left-4 right-4 z-10 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            disabled={showInitialOverlay}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              if (value.length >= 2) {
                debouncedSearch(value);
              } else {
                setSearchResults([]);
              }
            }}
            placeholder="Enter your postcode or town..."
            className="w-full px-4 py-2.5 md:py-3 pl-4 pr-20 md:pr-24 bg-black/80 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
          
          <button
            disabled={isLoading || !searchQuery}
            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 px-2 md:px-3 py-1 md:py-1.5 bg-[#3E797F]/20 hover:bg-[#3E797F]/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#3E797F] border-t-transparent"></div>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                <span className="text-xs md:text-sm">Locate</span>
              </>
            )}
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div 
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg overflow-hidden max-h-[40vh] overflow-y-auto"
          >
            {searchResults.map((result, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleLocationSelect(result)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    handleLocationSelect(result)
                  }
                }}
                className="block w-full px-3 md:px-4 py-2.5 md:py-3 text-left hover:bg-[#3E797F]/20 text-white text-xs md:text-sm border-b border-[#3E797F]/20 last:border-0 transition-colors cursor-pointer"
              >
                {result.place_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-black">
        <div ref={mapContainer} className="absolute inset-0 bg-black" />
        
        {/* Initial Overlay */}
        {showInitialOverlay && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-[320px] md:max-w-md text-center p-6 md:p-8">
              <div className="mb-3">
                <div className="flex items-center justify-center gap-2 text-[#3E797F] mb-4">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Get Your Free Quote</h3>
                <div className="h-1 w-20 bg-[#3E797F] mx-auto rounded-full mb-4"></div>
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-base md:text-lg text-white/90">
                  Find out which premium services are available in your area
                </p>
                <ul className="text-sm md:text-base text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3E797F]" />
                    Mobile Diamond Cutting Service
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3E797F]" />
                    Collection & Delivery Options
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3E797F]" />
                    Instant Service Availability Check
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setShowInitialOverlay(false)
                  // Focus the search input after a short delay to allow transition
                  setTimeout(() => {
                    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
                    if (searchInput) searchInput.focus()
                  }, 100)
                }}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-base md:text-lg shadow-lg"
              >
                Check Your Area Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Legend - moved higher and added workshop marker */}
        <div className="absolute bottom-16 left-4 bg-black/80 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-[#3E797F]/30 text-xs md:text-sm">
          {/* Remove these style tags */}
          {/* <style>{pulsingDotStyle}</style> */}
          <h3 className="text-sm font-semibold mb-3">Service Areas</h3>
          <div className="space-y-2.5">
            {/* Workshop Location with animation */}
            <div className="flex items-center gap-2 border-b border-[#3E797F]/20 pb-2 mb-2">
              <div className="relative">
                <div 
                  className="w-4 h-4 rounded-full bg-[#3E797F]"
                  style={{ animation: 'pulse 2s ease-in-out infinite' }}
                />
                <div 
                  className="absolute inset-0 rounded-full ring-2 ring-white/20"
                  style={{ animation: 'pulse 2s ease-in-out infinite' }}
                />
              </div>
              <span className="text-sm">Workshop (Marsh Barton)</span>
            </div>
            
            {/* Coverage Areas */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#3E797F] opacity-40"></div>
              <span className="text-sm">Mobile Service Area</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#FF6B6B] opacity-40"></div>
              <span className="text-sm">Collection & Delivery Area</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add error message display */}
      {errorMessage && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-500/90 backdrop-blur-sm text-white text-sm rounded-lg">
          {errorMessage}
        </div>
      )}

      {showQuoteCalculator && quoteLocation && (
        <ServiceBooking
          location={quoteLocation.name}
          distance={quoteLocation.distance}
          serviceTypes={quoteLocation.services}
          onClose={() => setShowQuoteCalculator(false)}
        />
      )}
    </div>
  )
} 