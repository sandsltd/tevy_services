import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator, Firestore, collection, doc, getDoc, setDoc, FirestoreError } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'

type FirebaseConfigKeys = 'apiKey' | 'authDomain' | 'projectId' | 'storageBucket' | 'messagingSenderId' | 'appId' | 'region'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  region: 'europe-west2'
} as const

// Validate config
const validateConfig = () => {
  const requiredFields: FirebaseConfigKeys[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ]

  const missingFields = requiredFields.filter(field => !firebaseConfig[field])
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required Firebase configuration fields: ${missingFields.join(', ')}`)
  }
}

let db: Firestore

try {
  // Validate configuration before initializing
  validateConfig()
  
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  
  // Test database connection
  const testConnection = async () => {
    try {
      // Simple write test
      const testDoc = await setDoc(
        doc(db, '_test_', 'connection-test'),
        { 
          timestamp: new Date(),
          test: true
        },
        { merge: true }
      )
      console.log('Firestore write test successful')
      
    } catch (error) {
      console.error('Firestore test failed:', error)
      if (error instanceof FirebaseError) {
        console.error('Error code:', error.code)
        console.error('Error message:', error.message)
      }
    }
  }
  
  // Run test connection
  testConnection()
  
  console.log('Firebase initialized successfully')
} catch (error) {
  console.error('Firebase initialization error:', error)
  throw error
}

export { db }