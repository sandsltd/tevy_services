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
      [-3.5622329077768313, 50.98657903618871],  // North of Exeter (lowered)
      [-3.6271844317002376, 50.911893220910315],  // Tiverton area (adjusted)
      [-3.7271844317002376, 50.851893220910315],  // New point to smooth curve
      [-3.913967437397474, 50.73756900656184],    // Dartmoor
      [-4.100790619208453, 50.53645876569945],    // Plymouth North
      [-4.183732493827108, 50.42843720187119],    // Plymouth
      [-4.190275527553666, 50.3660534674336],     // Plymouth South
      [-4.112054011391109, 50.3118747167473],     // Coast
      [-4.003331695261323, 50.26460883600211],    // South coast
      [-3.9011110021571085, 50.21454255369434],   // South Devon
      [-3.7488758374622932, 50.18950308398712],   // Salcombe area
      [-3.6031587167817634, 50.19365281491028],   // Start Point
      [-3.55313709447168, 50.28545816376817],     // Dartmouth
      [-3.470509543884617, 50.34796748292297],    // Brixham
      [-3.3965476681091786, 50.436689141907664],  // Torquay
      [-3.435707045740884, 50.48100143361481],    // Teignmouth
      [-3.394372814965834, 50.54737787718577],    // Exeter South
      [-3.398794476913764, 50.65229050125592],    // Exeter
      [-3.420680147814494, 50.7967663159767],     // North of Exeter
      [-3.4622329077768313, 50.88657903618871],   // New point to smooth curve
      [-3.5622329077768313, 50.98657903618871],   // Back to start
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