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
  
  // If location is outside service areas
  if (coverageTypes.includes('outside')) {
    return `
      <div class="flex flex-col gap-3">
        <div class="bg-[#3E797F]/20 p-3 rounded-lg">
          <h3 class="font-bold text-lg">${location}</h3>
          <p class="text-sm text-gray-300">Outside Service Area</p>
          <div class="flex items-center gap-2 mt-2">
            <div class="w-2 h-2 rounded-full bg-[#3E797F]"></div>
            <span class="text-sm">Workshop Service Available</span>
          </div>
          <p class="text-xs text-gray-400 mt-2">
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
    <div class="flex flex-col gap-3">
      <div class="bg-[#3E797F]/20 p-3 rounded-lg">
        <h3 class="font-bold text-lg">${location}</h3>
        <p class="text-sm text-gray-300">Available Services:</p>
        ${coverageTypes.map(type => `
          <div class="flex items-center gap-2 mt-2">
            <div class="w-2 h-2 rounded-full bg-[#3E797F]"></div>
            <span class="text-sm">${type === 'mobile' ? 'Mobile Service' : 'Collection Service'}</span>
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
      <div className="absolute top-4 left-4 right-4 z-50 w-full max-w-md mx-auto">
        <div className="bg-black/90 backdrop-blur-sm border border-[#3E797F] rounded-xl p-3 md:p-4">
          <div className="text-center mb-2 md:mb-3">
            <h3 className="text-lg md:text-2xl font-bold">Get Your Free Quote</h3>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Enter your postcode or click anywhere on the map</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              aria-label="Search location"
              placeholder="Enter your postcode..."
              role="searchbox"
              className="w-full md:flex-1 bg-black/50 px-3 md:px-4 py-2 md:py-2.5 rounded-lg border-2 border-[#3E797F]/30 text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                // Remove overlay and instructions when user starts typing
                if (showInitialOverlay) {
                  setShowInitialOverlay(false);
                  setShowLegend(true);
                }
                if (value.length >= 2) {
                  debouncedSearch(value);
                } else {
                  setSearchResults([]);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(searchQuery)
                }
              }}
            />
            <button 
              onClick={() => handleSearch(searchQuery)}
              className="w-full md:w-auto bg-[#3E797F] px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-medium hover:bg-[#3E797F]/80 transition-all flex items-center justify-center gap-2 text-sm whitespace-nowrap hover:scale-105"
            >
              <MapPin className="w-4 h-4" />
              <span className="md:hidden">Search</span>
              <span className="hidden md:inline">Check Coverage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Results - Mobile Optimized */}
      {searchResults.length > 0 && (
        <div className="absolute top-[160px] md:top-[180px] left-4 right-4 md:max-w-md mx-auto bg-black/90 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg overflow-hidden z-50">
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(result)}
              className="w-full px-4 py-3 text-left text-sm md:text-base hover:bg-[#3E797F]/20 border-b border-[#3E797F]/20 last:border-0"
            >
              {result.place_name}
            </button>
          ))}
        </div>
      )}

      {/* Initial Overlay - Mobile Optimized */}
      {showInitialOverlay && (
        <div className="absolute inset-0 md:left-0 md:right-auto md:w-[500px] bg-gradient-to-r from-black/95 via-black/90 to-transparent p-4 md:p-8 flex flex-col pointer-events-auto">
          <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-3xl md:text-5xl font-bold">
                <span className="text-[#3E797F]">Interactive</span><br/>
                <span className="text-white">Coverage Map</span>
              </h2>
              <p className="text-base md:text-lg text-white/80">
                Discover our premium mobile and collection services available in your area
              </p>
            </div>

            <div className="space-y-3 md:space-y-4 w-full max-w-sm">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="bg-black/40 p-2 md:p-3 rounded-lg border border-[#3E797F]/30">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-2 h-2 rounded-sm bg-[#3E797F]" />
                    <span className="text-xs md:text-sm">Mobile Service</span>
                  </div>
                </div>
                <div className="bg-black/40 p-2 md:p-3 rounded-lg border border-[#3E797F]/30">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-2 h-2 rounded-sm bg-[#FF6B6B]" />
                    <span className="text-xs md:text-sm">Collection Area</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCloseOverlay}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-base md:text-lg shadow-lg group relative overflow-hidden"
              >
                <span className="relative z-10">Get Free Quote</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend - Mobile Optimized */}
      <div className={`absolute bottom-4 left-4 right-4 md:right-auto md:w-auto bg-black/90 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-[#3E797F]/30 transition-all duration-500 shadow-lg ${showLegend ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <h3 className="text-xs md:text-sm font-semibold mb-2 md:mb-3">Service Areas</h3>
        <div className="flex md:block justify-around items-center space-y-0 md:space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="relative w-3 md:w-4 h-3 md:h-4 rounded-full bg-[#3E797F] shadow-md" />
            <span className="text-xs md:text-sm">Workshop</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 md:w-4 h-3 md:h-4 rounded-sm bg-[#3E797F] opacity-40 shadow-md" />
            <span className="text-xs md:text-sm">Mobile</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 md:w-4 h-3 md:h-4 rounded-sm bg-[#FF6B6B] opacity-40 shadow-md" />
            <span className="text-xs md:text-sm">Collection</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden bg-black">
        {!isInView ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="w-10 h-10 border-2 border-[#3E797F] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : null}
        <div ref={mapContainer} className="absolute inset-0 bg-black" />
        
        {showInitialOverlay && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-[500px] bg-gradient-to-r from-black/95 via-black/90 to-transparent p-8 flex flex-col pointer-events-auto">
              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-bold">
                    <span className="text-[#3E797F]">Interactive</span><br/>
                    <span className="text-white">Coverage Map</span>
                  </h2>
                  <p className="text-lg text-white/80">
                    Discover our premium mobile and collection services available in your area
                  </p>
                </div>

                <div className="space-y-4 w-full max-w-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/40 p-2 md:p-3 rounded-lg border border-[#3E797F]/30">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="w-2 h-2 rounded-sm bg-[#3E797F]" />
                        <span className="text-xs md:text-sm">Mobile Service</span>
                      </div>
                    </div>
                    <div className="bg-black/40 p-2 md:p-3 rounded-lg border border-[#3E797F]/30">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="w-2 h-2 rounded-sm bg-[#FF6B6B]" />
                        <span className="text-xs md:text-sm">Collection Area</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCloseOverlay}
                    className="w-full px-6 py-4 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-lg shadow-lg group relative overflow-hidden"
                  >
                    <span className="relative z-10">Get Free Quote</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend - mobile optimized */}
        <div className={`absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm p-4 rounded-lg border border-[#3E797F]/30 transition-all duration-500 shadow-lg ${showLegend ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <h3 className="text-sm font-semibold mb-3">Service Areas</h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 rounded-full bg-[#3E797F] shadow-md" />
              <span className="text-sm">Workshop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#3E797F] opacity-40 shadow-md" />
              <span className="text-sm">Mobile Service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#FF6B6B] opacity-40 shadow-md" />
              <span className="text-sm">Collection Area</span>
            </div>
          </div>
        </div>
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