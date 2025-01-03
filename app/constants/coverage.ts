import type { Feature, Polygon, FeatureCollection } from 'geojson'

// Define the mobile service coverage area
export const MOBILE_COVERAGE: Feature<Polygon> = {
  type: 'Feature',
  properties: {
    name: 'Mobile Service Area',
    description: 'Area where we offer mobile services'
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-3.7, 51.0],     // West of Tiverton
      [-3.55, 51.0],    // Tiverton
      [-3.4, 50.95],    // Northeast of Tiverton
      [-3.35, 50.9],    // East of Tiverton
      [-3.3, 50.85],    // Southeast
      [-3.2, 50.8],     // Extended east of Exmouth
      [-2.8, 50.75],    // Dorchester
      [-2.5, 50.7],     // Poole
      [-1.9, 50.8],     // Portsmouth
      [-1.8, 50.9],     // North Portsmouth
      [-2.0, 51.0],     // Winchester
      [-2.2, 51.1],     // Andover
      [-2.4, 51.2],     // Westbury
      [-2.6, 51.2],     // Bath
      [-2.8, 51.1],     // Bristol
      [-3.0, 51.0],     // Bridgwater
      [-3.2, 51.0],     // Taunton
      [-3.4, 51.0],     // Wellington
      [-3.7, 51.0],     // Back to start
    ]]
  }
}

// Define the collection coverage area (Tiverton to Portsmouth)
const COLLECTION_COORDINATES = [
  [-3.55, 51.00],   // North of Tiverton
  [-3.40, 50.95],   // Northeast of Tiverton
  [-3.35, 50.90],   // East of Tiverton
  [-3.30, 50.85],   // Southeast of Tiverton
  [-3.25, 50.80],   // Towards Exmouth
  [-3.00, 50.75],   // Sidmouth
  [-2.70, 50.70],   // Weymouth
  [-2.40, 50.70],   // Bournemouth
  [-2.00, 50.75],   // Southampton
  [-1.90, 50.80],   // Portsmouth
  [-2.00, 50.90],   // Winchester
  [-2.20, 51.00],   // Salisbury
  [-2.40, 51.00],   // Warminster
  [-2.60, 51.00],   // Bath
  [-2.80, 51.00],   // Bristol
  [-3.00, 51.00],   // Bridgwater
  [-3.20, 51.00],   // Taunton
  [-3.40, 51.00],   // Wellington
  [-3.55, 51.00],   // Back to start
]

export const WHEEL_COLLECTION_COVERAGE: Feature<Polygon> = {
  type: 'Feature',
  properties: {
    name: 'Wheel Collection Area',
    description: 'Collection & delivery service for alloy painting and diamond cutting'
  },
  geometry: {
    type: 'Polygon',
    coordinates: [COLLECTION_COORDINATES]
  }
}

// Update combined coverage
export const COVERAGE_AREAS: FeatureCollection = {
  type: 'FeatureCollection',
  features: [MOBILE_COVERAGE, WHEEL_COLLECTION_COVERAGE]
} 