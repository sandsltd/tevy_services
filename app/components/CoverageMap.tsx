'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MOBILE_COVERAGE, WHEEL_COLLECTION_COVERAGE } from '../constants/coverage'
import { MapPin, Check, ArrowRight, Truck, Wrench, Info, MousePointer } from 'lucide-react'
import * as turf from '@turf/turf'
import ServiceBooking from './ServiceBooking'
import styles from './CoverageMap.module.css'

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
  .mapboxgl-popup {
    z-index: 1000;
  }
  
  .mapboxgl-popup-content {
    background: black !important;
    color: white !important;
    padding: 0.75rem !important;
    border-radius: 0.75rem !important;
    border: 1px solid rgba(62, 121, 127, 0.3);
    width: calc(100vw - 2rem) !important;
    max-width: 320px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .mapboxgl-popup-tip {
    display: none;
  }

  .mapboxgl-popup-close-button {
    color: white;
    font-size: 20px;
    padding: 4px 8px;
    right: 4px;
    top: 4px;
  }

  .mapboxgl-popup-close-button:hover {
    background: rgba(62, 121, 127, 0.2);
    border-radius: 4px;
  }

  @media (max-width: 640px) {
    .mapboxgl-popup {
      position: fixed !important;
      left: 1rem !important;
      right: 1rem !important;
      bottom: 5rem !important;
      top: auto !important;
      transform: none !important;
    }
    
    .mapboxgl-popup-content {
      width: 100% !important;
      margin: 0 auto;
    }
  }
`

// Update the getPopupContent function
const getPopupContent = (location: string, coverageTypes: CoverageType[], coordinates: [number, number]) => {
  const distanceMiles = Math.round(turf.distance(MARSH_BARTON, coordinates, { units: 'kilometers' }) * 0.621371)
  
  // If location is outside service areas
  if (coverageTypes.includes('outside')) {
    return `
      <div class="flex flex-col gap-3 text-white">
        <div class="bg-[#1A1A1A] p-4 rounded-lg border border-[#3E797F]/30">
          <h3 class="font-bold text-xl text-[#3E797F] mb-2">${location}</h3>
          <p class="text-white/90 font-medium mb-2">Outside Service Area</p>
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full bg-[#3E797F]"></div>
            <span class="text-white/80">Workshop Service Available</span>
          </div>
          <p class="text-sm text-white/60">
            Please visit our workshop in Marsh Barton, Exeter for our full range of services
          </p>
        </div>

        <button
          id="getQuoteBtn"
          data-location="${location}"
          data-distance="${distanceMiles}"
          data-services='${JSON.stringify(coverageTypes)}'
          class="w-full px-4 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-white font-bold transition-colors"
        >
          Get Workshop Quote
        </button>
      </div>
    `
  }

  // For locations within service areas
  return `
    <div class="flex flex-col gap-3 text-white">
      <div class="bg-[#1A1A1A] p-4 rounded-lg border border-[#3E797F]/30">
        <h3 class="font-bold text-xl text-[#3E797F] mb-2">${location}</h3>
        <p class="text-white/90 font-medium mb-2">Available Services:</p>
        ${coverageTypes.map(type => `
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full bg-[#3E797F]"></div>
            <span class="text-white/80">${type === 'mobile' ? 'Mobile Service' : 'Collection Service'}</span>
          </div>
        `).join('')}
      </div>

      <button
        id="getQuoteBtn"
        data-location="${location}"
        data-distance="${distanceMiles}"
        data-services='${JSON.stringify(coverageTypes)}'
        class="w-full px-4 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg text-white font-bold transition-colors"
      >
        Get Instant Quote
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
  const [showSearchTooltip, setShowSearchTooltip] = useState(false)
  const [showQuoteCalculator, setShowQuoteCalculator] = useState(false)
  const [quoteLocation, setQuoteLocation] = useState<{
    name: string
    distance: number
    services: CoverageType[]
  } | null>(null)
  const [showLegend, setShowLegend] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'zooming' | 'ready'>('initial')
  const [isInView, setIsInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [showInitialOverlay, setShowInitialOverlay] = useState(true)
  const [mapLoadingState, setMapLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading')

  // Move handleSearch before debouncedSearch
  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }

    // Remove overlay if still showing
    if (showInitialOverlay) {
      setShowInitialOverlay(false)
      setShowLegend(true)
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

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          // Disconnect observer after first intersection
          observerRef.current?.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    // Start observing the map container
    observerRef.current.observe(mapContainer.current)

    // Only initialize map if in view
    if (!isInView) return

    try {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API || ''

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-3.8, 50.9],
        zoom: 7.5,
        attributionControl: false,
        pitch: 60,
        bearing: -20,
        renderWorldCopies: false
      })

      newMap.on('load', () => {
        setMapLoadingState('loaded')
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
              'fill-opacity': 0.3,
              'fill-outline-color': '#3E797F'
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

        // Only do initial animation if not selecting a location from search
        if (!searchResults.length) {
          setTimeout(() => {
            setAnimationPhase('zooming')
            newMap.flyTo({
              center: [MARSH_BARTON[0], MARSH_BARTON[1] + 0.04],
              zoom: 9,
              duration: 3000,
              pitch: 50,
              bearing: -10,
              essential: true,
              easing: (t) => {
                return t * (2 - t)
              }
            })
            
            setTimeout(() => {
              setAnimationPhase('ready')
            }, 3000)
          }, 1000)
        }

        // Add click interaction
        newMap.on('click', (e) => {
          const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat]
          
          // If overlay is showing, close it first
          if (showInitialOverlay) {
            setShowInitialOverlay(false)
            setShowLegend(true)
            return
          }
          
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
            .addTo(newMap)

          // Remove existing popups
          const popups = document.getElementsByClassName('mapboxgl-popup')
          Array.from(popups).forEach(popup => popup.remove())

          // Reverse geocode the clicked location
          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?` +
            `types=place,locality,neighborhood,address,postcode&` +
            `country=gb&` +
            `limit=1&` +
            `access_token=${process.env.NEXT_PUBLIC_MAP_API}`
          )
            .then(response => response.json())
            .then(data => {
              const locationName = data.features[0]?.place_name || 'Selected Location'
              
              // Check coverage and create popup
              const coverage = checkCoverage(coordinates)
              const popupContent = document.createElement('div')
              popupContent.innerHTML = getPopupContent(locationName, coverage, coordinates)

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
                .addTo(newMap)

              // Adjust map view
              const isMobile = window.innerWidth < 640
              const offsetLat = coordinates[1] + (isMobile ? 0.18 : 0.06)
              const offsetLng = coordinates[0] - (isMobile ? 0.15 : 0.07)
              
              newMap.flyTo({
                center: [offsetLng, offsetLat],
                zoom: isMobile ? 10 : 11,
                duration: 2000,
                padding: {
                  top: isMobile ? 200 : 250,
                  bottom: isMobile ? 200 : 250,
                  left: isMobile ? 400 : 800,
                  right: isMobile ? 20 : 20
                }
              })
            })
            .catch(error => {
              console.error('Reverse geocoding failed:', error)
            })
        })

        // Add cursor style changes
        newMap.on('mouseenter', ['mobile-coverage-fill', 'collection-coverage-fill'], () => {
          newMap.getCanvas().style.cursor = 'pointer'
          // Show tooltip
          const tooltip = document.createElement('div')
          tooltip.className = 'map-tooltip'
          tooltip.innerHTML = 'Click to get quote'
        })

        newMap.on('mouseleave', ['mobile-coverage-fill', 'collection-coverage-fill'], () => {
          newMap.getCanvas().style.cursor = ''
        })
      })

      newMap.on('error', (e) => {
        console.error('Map error:', e)
        setMapLoadingState('error')
        setErrorMessage('Failed to load map. Please refresh the page.')
      })

      map.current = newMap

      return () => {
        if (map.current) {
          map.current.remove()
          map.current = null
        }
        observerRef.current?.disconnect()
      }
    } catch (error) {
      console.error('Map initialization error:', error)
      setMapLoadingState('error')
      setErrorMessage('Failed to initialize map. Please refresh the page.')
    }
  }, [isInView, showInitialOverlay])

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
    const offsetLat = lat + (isMobile ? 0.06 : 0.06)
    const offsetLng = lng + (isMobile ? 0.09 : 0.10)
    
    map.current.flyTo({
      center: [offsetLng, offsetLat],
      zoom: isMobile ? 9 : 11,
      duration: 2000,
      padding: {
        top: isMobile ? 100 : 250,
        bottom: isMobile ? 100 : 250,
        left: isMobile ? 20 : 900,
        right: isMobile ? 20 : 20
      }
    })

    // Clear search
    setSearchResults([])
    setSearchQuery('')
  }, [map])

  // Add this function to handle location
  const handleLocateMe = () => {
    console.log('Locate me clicked')
    const mapInstance = map.current
    if (!mapInstance || !navigator.geolocation) {
      console.log('Map or geolocation not available')
      return
    }
    
    setIsLocating(true)
    console.log('Getting position...')
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Position received:', position)
        const coordinates: [number, number] = [position.coords.longitude, position.coords.latitude]
        
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
          .addTo(mapInstance)

        // Remove existing popups
        const popups = document.getElementsByClassName('mapboxgl-popup')
        Array.from(popups).forEach(popup => popup.remove())

        // Reverse geocode the location
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?` +
          `types=place,locality,neighborhood,address,postcode&` +
          `country=gb&` +
          `limit=1&` +
          `access_token=${process.env.NEXT_PUBLIC_MAP_API}`
        )
          .then(response => response.json())
          .then(data => {
            if (!mapInstance) return // Check if map still exists
            
            const locationName = data.features[0]?.place_name || 'Your Location'
            
            // Check coverage and create popup
            const coverage = checkCoverage(coordinates)
            const popupContent = document.createElement('div')
            popupContent.innerHTML = getPopupContent(locationName, coverage, coordinates)

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
              .addTo(mapInstance)

            // Adjust map view
            const isMobile = window.innerWidth < 640
            const offsetLat = coordinates[1] + (isMobile ? 0.18 : 0.06)
            const offsetLng = coordinates[0] - (isMobile ? 0.15 : 0.07)
            
            mapInstance.flyTo({
              center: [offsetLng, offsetLat],
              zoom: isMobile ? 10 : 11,
              duration: 2000,
              padding: {
                top: isMobile ? 200 : 150,
                bottom: isMobile ? 200 : 250,
                left: isMobile ? 20 : 400,
                right: isMobile ? 20 : 100
              }
            })

            setShowInitialOverlay(false)
            setShowLegend(true)
          })
          .catch(error => {
            console.error('Reverse geocoding failed:', error)
            setErrorMessage('Could not determine location name')
          })
          .finally(() => {
            setIsLocating(false)
          })
      },
      (error) => {
        console.error('Geolocation error:', error)
        setErrorMessage('Could not access your location. Please check your browser settings and ensure you have allowed location access.')
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Increased timeout
        maximumAge: 0
      }
    )
  }

  // Update the overlay close handler
  const handleCloseOverlay = () => {
    setShowInitialOverlay(false);
    setShowLegend(true);
    // Show tooltip after a short delay
    setTimeout(() => {
      setShowSearchTooltip(true);
      // Hide tooltip after 5 seconds
      setTimeout(() => {
        setShowSearchTooltip(false);
      }, 5000);
    }, 500);
  };

  // Optimize marker creation with memoization
  const createMarker = useCallback((coordinates: [number, number]) => {
    const el = document.createElement('div')
    el.className = 'mapboxgl-marker custom-marker'
    // ... marker styling ...
    return new mapboxgl.Marker({ element: el })
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Search Input Container */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="bg-black border-b border-[#3E797F]/30 p-4">
          <div className="max-w-sm mx-auto space-y-4">
            <div>
              <h3 className="text-xl font-bold text-center">Get Your Free Quote</h3>
              <p className="text-sm text-gray-400 text-center mt-1">Enter your postcode or click map</p>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter postcode..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length >= 2) {
                    debouncedSearch(e.target.value);
                  }
                }}
                className="flex-1 bg-black/50 px-4 py-3 rounded-lg border border-[#3E797F]/30 text-sm focus:outline-none"
              />
              <button 
                onClick={() => handleSearch(searchQuery)}
                className="bg-[#3E797F] px-4 py-2 rounded-lg font-medium hover:bg-[#3E797F]/80 transition-all flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                <span className="md:hidden">Go</span>
                <span className="hidden md:inline">Check Coverage</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="absolute w-full bg-black border-b border-[#3E797F]/30">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(result)}
                className="w-full px-4 py-3 text-left hover:bg-[#3E797F]/20 border-b border-[#3E797F]/20 last:border-0"
              >
                {result.place_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className={`absolute bottom-0 left-0 right-0 bg-black border-t border-[#3E797F]/30 p-4 transition-all duration-500 ${showLegend ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/40 p-2 rounded-lg border border-[#3E797F]/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-[#3E797F]" />
                <span className="text-sm">Mobile Service</span>
              </div>
            </div>
            <div className="bg-black/40 p-2 rounded-lg border border-[#3E797F]/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-[#FF6B6B]" />
                <span className="text-sm">Collection Area</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-[100vh] bg-black">
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      {/* Error message - mobile optimized */}
      {errorMessage && (
        <div className="fixed bottom-4 left-4 right-4 md:absolute md:top-full md:mt-2 p-2 md:p-3 bg-red-500/90 backdrop-blur-sm text-white text-xs md:text-sm rounded-lg z-50">
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