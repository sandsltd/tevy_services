import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(request: Request) {
  try {
    // Get the request body as text first
    const body = await request.text()
    const quoteData = JSON.parse(body)
    
    // Add quote to Firestore with timestamp
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      createdAt: serverTimestamp(),
      status: 'pending'
    })

    // Use NextResponse.json with minimal options
    return NextResponse.json({
      success: true,
      quoteId: docRef.id
    })

  } catch (error) {
    console.error('Failed to save quote:', error)
    
    // Use NextResponse.json for error too
    return NextResponse.json({
      success: false,
      error: 'Failed to save quote'
    }, {
      status: 500
    })
  }
} 