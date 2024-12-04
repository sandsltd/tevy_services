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
      [-4.7, 50.5],     // Bodmin
      [-4.5, 50.5],     // East of Bodmin
      [-4.3, 50.6],     // Following A30
      [-4.1, 50.7],     // Launceston area
      [-3.9, 50.85],    // Towards Tiverton
      [-3.7, 51.0],     // West of Tiverton
      [-3.55, 51.0],    // Tiverton
      [-3.4, 50.95],    // Northeast of Tiverton
      [-3.35, 50.9],    // East of Tiverton
      [-3.3, 50.85],    // Southeast
      [-3.2, 50.8],     // Extended east of Exmouth
      [-3.15, 50.7],    // Further east coverage
      [-3.2, 50.6],     // Extended coastal coverage
      [-3.3, 50.5],     // Back towards Torbay
      [-3.4, 50.5],     // Torbay
      [-3.5, 50.3],     // Dartmouth area
      [-3.7, 50.2],     // Salcombe and Kingsbridge
      [-3.9, 50.2],     // South Devon coast
      [-4.2, 50.2],     // Plymouth area
      [-4.4, 50.15],    // Looe area
      [-4.7, 50.1],     // Fowey
      [-5.0, 50.0],     // Falmouth
      [-5.2, 49.9],     // Lizard Point
      [-5.4, 49.95],    // Penzance South
      [-5.7, 49.95],    // Porthcurno
      [-5.8, 50.1],     // Land's End
      [-5.7, 50.2],     // St Just
      [-5.5, 50.3],     // St Ives
      [-5.3, 50.35],    // Hayle
      [-5.1, 50.5],     // Newquay
      [-4.9, 50.6],     // Wadebridge
      [-4.8, 50.55],    // Towards Bodmin
      [-4.7, 50.5],     // Back to Bodmin
    ]]
  }
}

// Define the collection coverage area (Tiverton to Torbay including Exmouth)
const COLLECTION_COORDINATES = [
  [-3.55, 51.00],   // North of Tiverton
  [-3.40, 50.95],   // Northeast of Tiverton
  [-3.35, 50.90],   // East of Tiverton
  [-3.30, 50.85],   // Southeast of Tiverton
  [-3.25, 50.80],   // Towards Exmouth
  [-3.30, 50.75],   // Exmouth area
  [-3.32, 50.65],   // South of Exmouth
  [-3.35, 50.60],   // Coastal area
  [-3.40, 50.55],   // Between Exmouth and Teignmouth
  [-3.45, 50.50],   // Teignmouth
  [-3.50, 50.47],   // Torquay
  [-3.55, 50.43],   // Paignton
  [-3.60, 50.40],   // South of Paignton
  [-3.70, 50.42],   // Towards Dartmoor
  [-3.85, 50.45],   // Eastern Dartmoor
  [-4.00, 50.50],   // Princetown area
  [-3.95, 50.60],   // North Dartmoor
  [-3.90, 50.70],   // West of Exeter
  [-3.85, 50.80],   // Northwest of Exeter
  [-3.75, 50.90],   // South of Tiverton
  [-3.65, 50.95],   // West of Tiverton
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