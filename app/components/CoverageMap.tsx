'use client'
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { COVERAGE_AREA } from '../constants/coverage'
import { MapPin as LocationIcon } from 'lucide-react'

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

export default function CoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

      // Wait for map to load before adding layers
      newMap.on('load', () => {
        console.log('Map loaded successfully')
        
        try {
          // Add coverage area
          newMap.addSource('coverage-area', {
            type: 'geojson',
            data: COVERAGE_AREA
          })

          newMap.addLayer({
            id: 'coverage-gradient',
            type: 'fill',
            source: 'coverage-area',
            paint: {
              'fill-color': '#3E797F',
              'fill-opacity': 0.2
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

  return (
    <div className="relative">
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
                <LocationIcon className="w-4 h-4" />
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
                    
                    map.current.flyTo({
                      center: [lng, lat],
                      zoom: 13,
                      duration: 2000
                    })

                    // Add a marker at the selected location
                    new mapboxgl.Marker({
                      color: '#3E797F'
                    })
                      .setLngLat([lng, lat])
                      .addTo(map.current)

                    // Clear search results
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
        <div 
          ref={mapContainer} 
          className="absolute inset-0"
        />
      </div>

      {/* Add error message display */}
      {errorMessage && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-500/90 backdrop-blur-sm text-white text-sm rounded-lg">
          {errorMessage}
        </div>
      )}
    </div>
  )
} 