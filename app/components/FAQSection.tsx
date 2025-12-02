'use client'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title: string
  subtitle: string
  faqs: FAQ[]
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border border-[#3E797F]/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between bg-black/20 hover:bg-black/30 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`
        overflow-hidden transition-all duration-300
        ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-6 pt-0 text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0A1A1B] to-[#0F2A2C]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#3E797F] to-[#5BA0A8] bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg">
            {subtitle}
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}