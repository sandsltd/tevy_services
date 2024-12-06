'use client'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export default function FirebaseTest() {
  const [testStatus, setTestStatus] = useState<string>('Not tested')
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    try {
      // Try to write a test document
      const docRef = await addDoc(collection(db, 'test'), {
        timestamp: new Date(),
        test: true
      })
      
      // Try to read documents
      const querySnapshot = await getDocs(collection(db, 'test'))
      const docsCount = querySnapshot.size

      setTestStatus(`Connection successful! Found ${docsCount} test documents.`)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setTestStatus('Failed')
    }
  }

  return (
    <div className="p-4 bg-black/50 rounded-lg border border-[#3E797F]/30">
      <h3 className="text-lg font-semibold mb-4">Firebase Connection Test</h3>
      <div className="space-y-2">
        <p>Status: {testStatus}</p>
        {error && <p className="text-red-500">Error: {error}</p>}
        <button
          onClick={testConnection}
          className="px-4 py-2 bg-[#3E797F] rounded-lg hover:bg-[#3E797F]/80"
        >
          Test Connection
        </button>
      </div>
    </div>
  )
} 