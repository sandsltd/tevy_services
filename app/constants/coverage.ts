import type { Feature, Polygon } from 'geojson'

export const COVERAGE_AREA: Feature<Polygon> = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-5.3, 50.2],    // Camborne area
      [-5.25, 50.25],  // Smoothing point
      [-5.2, 50.3],    // Following A30
      [-5.1, 50.35],   // Smoothing point
      [-4.9, 50.4],    // Near Indian Queens
      [-4.7, 50.42],   // Following A30
      [-4.5, 50.45],   // Bodmin area
      [-4.3, 50.5],    // Following A30
      [-4.1, 50.6],    // Launceston area
      [-4.0, 50.8],    // Tiverton area
      [-3.8, 50.85],   // Smoothing point
      [-3.6, 50.9],    // North of Exeter
      [-3.5, 50.85],   // Smoothing point
      [-3.4, 50.8],    // East Exeter
      [-3.3, 50.75],   // Smoothing point
      [-3.2, 50.7],    // South Devon
      [-3.3, 50.6],    // Smoothing point
      [-3.4, 50.5],    // Torbay
      [-3.45, 50.4],   // Smoothing point
      [-3.5, 50.3],    // Dartmouth area
      [-3.6, 50.25],   // Smoothing point
      [-3.7, 50.2],    // Salcombe and Kingsbridge
      [-3.8, 50.2],    // Smoothing point
      [-3.9, 50.2],    // South Devon coast
      [-4.05, 50.2],   // Smoothing point
      [-4.2, 50.2],    // Plymouth area
      [-4.4, 50.15],   // Smoothing point
      [-4.6, 50.1],    // South Cornwall
      [-4.8, 50.05],   // Smoothing point
      [-5.0, 50.0],    // Near Falmouth
      [-5.2, 50.1],    // Smoothing point
      [-5.3, 50.2],    // Back to start
    ]]
  }
} 