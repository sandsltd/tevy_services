'use client'
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MOBILE_COVERAGE, WHEEL_COLLECTION_COVERAGE } from '../constants/coverage'
import { MapPin } from 'lucide-react'
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

// Add this CSS style along with the pulsingDotStyle
const popupStyle = `
  .mapboxgl-popup-content {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(62, 121, 127, 0.3);
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  .mapboxgl-popup-close-button {
    color: white;
    font-size: 16px;
    padding: 4px 8px;
  }
  .mapboxgl-popup-tip {
    border-top-color: rgba(0, 0, 0, 0.85) !important;
    border-bottom-color: rgba(0, 0, 0, 0.85) !important;
  }
`

// Update the getPopupContent function
const getPopupContent = (location: string, coverageTypes: CoverageType[], coordinates: [number, number]) => {
  const distanceMiles = Math.round(turf.distance(MARSH_BARTON, coordinates, { units: 'kilometers' }) * 0.621371)
  
  const driveTimeMinutes = Math.round((distanceMiles / 40) * 60)
  const driveTimeText = driveTimeMinutes > 60 
    ? `${Math.floor(driveTimeMinutes / 60)}h ${driveTimeMinutes % 60}m`
    : `${driveTimeMinutes}m`

  const servicesInfo = {
    mobile: {
      title: "✓ Premium Mobile Service Available",
      description: "Professional on-site diamond cut wheel repair and alloy wheel polishing service at your location",
      bgColor: "rgba(62, 121, 127, 0.2)"
    },
    'wheel-collection': {
      title: "✓ Collection & Delivery Services",
      services: [
        {
          title: "Alloy Wheel Services",
          description: "Collection & delivery service for diamond cutting and custom painting",
          bgColor: "rgba(255, 107, 107, 0.15)"
        },
        {
          title: "Tyre Services",
          description: "Collection & delivery service for tyre fitting and repairs",
          bgColor: "rgba(255, 107, 107, 0.15)"
        }
      ],
      bgColor: "rgba(255, 107, 107, 0.2)"
    },
    outside: {
      title: "Outside Service Area",
      description: "Contact us to discuss custom service options for your location",
      bgColor: "rgba(255, 255, 255, 0.1)"
    }
  }

  const servicesContent = coverageTypes.map(type => {
    if (type === 'wheel-collection') {
      const services = servicesInfo[type].services.map(service => `
        <div style="background: ${service.bgColor}" class="p-3 rounded-lg">
          <p class="text-sm font-semibold text-white">✓ ${service.title}</p>
          <p class="text-sm text-gray-200">${service.description}</p>
        </div>
      `).join('')

      return `
        <div class="flex flex-col gap-2">
          <p class="text-sm font-semibold text-white mb-1">${servicesInfo[type].title}</p>
          ${services}
        </div>
      `
    }

    return `
      <div style="background: ${servicesInfo[type].bgColor}" class="p-3 rounded-lg">
        <p class="text-sm font-semibold text-white">${servicesInfo[type].title}</p>
        <p class="text-sm text-gray-200">${servicesInfo[type].description}</p>
      </div>
    `
  }).join('')

  return `
    <div class="flex flex-col gap-4">
      <div>
        <h3 class="text-xl font-semibold text-white">${location}</h3>
        <div class="flex flex-col gap-1.5 mt-2">
          <div class="flex items-center gap-2 text-sm">
            <svg class="w-4 h-4 text-[#3E797F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="text-gray-300">${distanceMiles} miles from workshop</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <svg class="w-4 h-4 text-[#3E797F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="text-gray-300">Estimated ${driveTimeText} drive time</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        ${servicesContent}
      </div>
      <button
        id="getQuoteBtn"
        data-location="${location}"
        data-distance="${distanceMiles}"
        data-services='${JSON.stringify(coverageTypes)}'
        class="w-full px-4 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-semibold transition-colors"
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
        `bbox=-5.5,49.8,-2.5,51.5&` +
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
        center: MARSH_BARTON,
        zoom: 9,
        attributionControl: false,
        pitch: 50,
        bearing: -10
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

  return (
    <div className="relative">
      <style>{pulsingDotStyle}</style>
      <style>{popupStyle}</style>
      {/* Search Box */}
      <div className="absolute top-4 left-4 right-4 z-10 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              if (value.length >= 2) { // Only search if 2 or more characters
                debouncedSearch(value);
              } else {
                setSearchResults([]); // Clear results if input is too short
              }
            }}
            placeholder="Enter your postcode or town..."
            className="w-full px-4 py-3 pl-4 pr-24 bg-black/80 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3E797F] transition-colors"
          />
          
          <button
            disabled={isLoading || !searchQuery}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#3E797F]/20 hover:bg-[#3E797F]/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#3E797F] border-t-transparent"></div>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Locate Me</span>
              </>
            )}
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg overflow-hidden">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => {
                  if (map.current && result.center) {
                    const [lng, lat] = result.center
                    const coordinates: [number, number] = [lng, lat]
                    
                    // Clear existing markers
                    const markers = document.getElementsByClassName('mapboxgl-marker')
                    while(markers.length > 0){
                      markers[0].remove()
                    }

                    // Add new marker
                    new mapboxgl.Marker({
                      color: '#3E797F'
                    })
                      .setLngLat(coordinates)
                      .addTo(map.current)

                    // Remove existing popups
                    const popups = document.getElementsByClassName('mapboxgl-popup')
                    while(popups.length > 0){
                      popups[0].remove()
                    }

                    // Check coverage and create popup
                    const coverage = checkCoverage(coordinates)
                    const popupContent = document.createElement('div')
                    popupContent.innerHTML = getPopupContent(result.place_name, coverage, coordinates)

                    // Add popup
                    new mapboxgl.Popup({
                      closeButton: true,
                      className: 'coverage-popup',
                      maxWidth: '320px',
                      offset: 25
                    })
                      .setLngLat(coordinates)
                      .setDOMContent(popupContent)
                      .addTo(map.current)

                    // Adjust map view
                    map.current.flyTo({
                      center: [lng - 0.02, lat], // Offset to make room for popup
                      zoom: 12,
                      duration: 2000
                    })

                    // Clear search
                    setSearchResults([])
                    setSearchQuery('')
                  }
                }}
                className="w-full px-4 py-3 text-left hover:bg-[#3E797F]/20 text-white text-sm border-b border-[#3E797F]/20 last:border-0 transition-colors"
              >
                {result.place_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Initial Overlay */}
        {showInitialOverlay && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <div className="max-w-md text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Check Service Availability</h3>
              <p className="text-gray-300 mb-6">
                Enter your location or click anywhere on the map to check which services are available in your area
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setShowInitialOverlay(false)}
                  className="px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Start Now
                </button>
                <button
                  onClick={() => {
                    setShowInitialOverlay(false)
                    // Add geolocation request here if you want
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        if (map.current) {
                          const coords: [number, number] = [position.coords.longitude, position.coords.latitude]
                          map.current.flyTo({
                            center: coords,
                            zoom: 12,
                            duration: 2000
                          })
                        }
                      })
                    }
                  }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Use My Location
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Legend - moved higher and added workshop marker */}
        <div className="absolute bottom-16 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-[#3E797F]/30">
          <style>{pulsingDotStyle}</style>
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