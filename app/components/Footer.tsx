'use client'
import { Phone, Mail, Facebook, Instagram, MapPin } from 'lucide-react'
import { contactInfo } from '../constants/contact'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#3E797F]/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <Phone className="w-5 h-5 text-[#3E797F] mr-3" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-[#3E797F]">
                  {contactInfo.phone}
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 text-[#3E797F] mr-3" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-[#3E797F]">
                  {contactInfo.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#3E797F] mt-1" />
                <span>
                  Unit 63, Yeoford Way<br />
                  Marsh Barton, Exeter<br />
                  EX2 8LB<br />
                  <span className="text-[#3E797F]">By Appointment Only</span>
                </span>
              </p>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/diamond-cut" className="hover:text-[#3E797F]">
                  Diamond Cut Refurbishment
                </Link>
              </li>
              <li>
                <Link href="/services/painted-alloys" className="hover:text-[#3E797F]">
                  Painted Alloys & Colour Changes
                </Link>
              </li>
              <li>
                <Link href="/services/tyres" className="hover:text-[#3E797F]">
                  Tyre Replacement
                </Link>
              </li>
              <li>
                <Link href="/services/tyre-repair" className="hover:text-[#3E797F]">
                  Tyre Repair
                </Link>
              </li>
              <li>
                <Link href="/services/tpms" className="hover:text-[#3E797F]">
                  TPMS Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/p/Tevy-Services-Ltd-100084870008150/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3E797F] hover:text-[#706F6F]"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/tevyservicesltd/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3E797F] hover:text-[#706F6F]"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.tiktok.com/@tevyservices" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3E797F] hover:text-[#706F6F]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-[#3E797F]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3E797F]/20 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400 mb-6">
            © {new Date().getFullYear()} Tevy Services. All rights reserved.
          </p>
          
          {/* Designer Credit */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-gray-500">Website designed & developed by</p>
            <a 
              href="https://www.saunders-simmons.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/saunders_simmons_logo.png"
                alt="Saunders & Simmons"
                width={120}
                height={40}
                className="h-auto w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 