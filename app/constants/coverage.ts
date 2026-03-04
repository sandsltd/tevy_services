import type { Feature, Polygon, FeatureCollection } from 'geojson'

// Define the mobile service coverage area (green zone)
export const MOBILE_COVERAGE: Feature<Polygon> = {
  type: 'Feature',
  properties: {
    name: 'Mobile Service Area',
    description: 'Area where we offer mobile services'
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-3.56, 50.78],   // Northwest Exeter
      [-3.40, 50.76],   // Northeast Exeter
      [-3.38, 50.69],   // Exmouth coast
      [-3.43, 50.58],   // Dawlish / Teignmouth
      [-3.38, 50.47],   // Torquay north coast
      [-3.38, 50.38],   // Torquay / Paignton
      [-3.47, 50.28],   // Dartmouth / Start Bay
      [-3.62, 50.20],   // Start Point area
      [-3.75, 50.19],   // Salcombe
      [-3.90, 50.24],   // South coast PL8
      [-4.02, 50.29],   // PL8 area
      [-4.13, 50.36],   // Plymouth east
      [-4.19, 50.38],   // Plymouth city
      [-4.22, 50.43],   // Saltash / Plymouth NW
      [-4.18, 50.50],   // PL5 / PL6 north
      [-4.05, 50.49],   // PL7 / Ivybridge area
      [-3.92, 50.50],   // TQ / PL north boundary
      [-3.78, 50.57],   // Buckfastleigh / A38
      [-3.68, 50.68],   // West Exeter approach
      [-3.56, 50.78],   // Back to start
    ]]
  }
}

// Define the collection coverage area (red zone) - adjusted to stay within green zone
const COLLECTION_COORDINATES = [
  [-3.501137390748852, 50.75330179753982],    // North Exeter
  [-3.6312193789269145, 50.69879655748164],   // West of Exeter
  [-3.8400194945003534, 50.6454285425331],    // Dartmoor East
  [-3.9433675988547066, 50.56648215423047],   // Dartmoor South
  [-3.9381139261345197, 50.501877508892875],  // South Dartmoor
  [-3.7540834344532925, 50.512665878017316],  // Newton Abbot North
  [-3.625900194754678, 50.46018591331992],    // Newton Abbot
  [-3.553811599798337, 50.41309868384954],    // Torquay North
  [-3.4683239438801547, 50.43206368275071],   // Torquay (adjusted west)
  [-3.4191018887595317, 50.54385655132967],   // Exeter South (adjusted west)
  [-3.437762071585445, 50.63758222102064],    // East of Exeter (adjusted west)
  [-3.4510103513022614, 50.69102756482016],   // Northeast Exeter (adjusted west)
  [-3.501137390748852, 50.75330179753982],    // Back to start
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