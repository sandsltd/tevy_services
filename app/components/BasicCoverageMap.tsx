'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf'
import { COVERAGE_AREA } from '../constants/coverage'

const MARSH_BARTON: [number, number] = [-4.2, 50.4]

export default function BasicCoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    try {
      if (!process.env.NEXT_PUBLIC_MAP_API) {
        throw new Error('Mapbox token is missing')
      }

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-4.2, 50.4],
        zoom: 8,
        attributionControl: false,
        pitch: 0,
        bearing: 0,
        bounds: [
          [-5.5, 49.8],
          [-2.5, 51.5]
        ],
        fitBoundsOptions: {
          padding: 50
        }
      })

      newMap.on('style.load', () => {
        // Add coverage area source
        newMap.addSource('coverage-area', {
          type: 'geojson',
          data: COVERAGE_AREA
        })

        // Simple fill layer
        newMap.addLayer({
          id: 'coverage-area-fill',
          type: 'fill',
          source: 'coverage-area',
          paint: {
            'fill-color': '#3E797F',
            'fill-opacity': 0.2
          }
        })

        // Simple border
        newMap.addLayer({
          id: 'coverage-area-border',
          type: 'line',
          source: 'coverage-area',
          paint: {
            'line-color': '#3E797F',
            'line-width': 2
          }
        })

        // Add center marker
        new mapboxgl.Marker({ color: '#3E797F' })
          .setLngLat(MARSH_BARTON)
          .addTo(newMap)

        // Add scale control
        newMap.addControl(new mapboxgl.ScaleControl(), 'bottom-left')
      })

      // Fit map to coverage area bounds
      newMap.on('load', () => {
        const bounds = turf.bbox(COVERAGE_AREA)
        newMap.fitBounds([
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]]
        ], {
          padding: 50
        })
      })

      map.current = newMap

    } catch (error) {
      console.error('Failed to initialize map:', error)
    }

    return () => map.current?.remove()
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute inset-0"
      />
      <style jsx global>{`
        .mapboxgl-canvas {
          width: 100% !important;
          height: 100% !important;
        }
        .mapboxgl-map {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  )
} 