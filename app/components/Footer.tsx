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
              <a href="#" className="text-[#3E797F] hover:text-[#706F6F]">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#3E797F] hover:text-[#706F6F]">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
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