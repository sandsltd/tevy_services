import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const getCustomerEmailContent = (name: string, hasPhotos: boolean): string => {
  let content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3E797F; margin-bottom: 24px;">Thank you for your quote request, ${name}!</h2>
      ${hasPhotos ? `
        <p style="color: #333; line-height: 1.5; margin-bottom: 20px;">
          We've received your request and photos. We'll review them and send you a detailed quote for your wheel refurbishment shortly.
        </p>
      ` : `
        <p style="color: #333; line-height: 1.5; margin-bottom: 20px;">
          We've received your request. Once we receive your wheel photos, we'll be able to provide you with an accurate quote for your refurbishment.
        </p>
      `}
      <p style="color: #666; font-size: 14px; margin-bottom: 20px; padding: 12px; background: #f9f9f9; border-radius: 4px;">
        <strong>Note:</strong> Please add <strong>info@tevyservices.co.uk</strong> to your contacts to ensure our emails reach your inbox. 
      </p>
  `

  if (!hasPhotos) {
    content += `
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <h3 style="color: #3E797F; margin-bottom: 16px;">Sending Photos</h3>
        <p style="color: #333; margin-bottom: 16px;">
          To receive your quote, please send photos of your wheels using either of these options:
        </p>
        <ul style="color: #333; margin-bottom: 20px; padding-left: 20px;">
          <li style="margin-bottom: 12px;">
            <strong>WhatsApp:</strong> 
            <a href="https://wa.me/447572634898?text=Hi,%20I%20just%20submitted%20a%20quote%20request.%20Here%20are%20my%20wheel%20photos..." 
               style="color: #3E797F; text-decoration: none; display: inline-block; padding: 8px 16px; background: #25D366; color: white; border-radius: 4px; margin-left: 8px;">
              Open WhatsApp Chat
            </a>
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Email:</strong> 
            <a href="mailto:info@tevyservices.co.uk" style="color: #3E797F;">info@tevyservices.co.uk</a>
          </li>
        </ul>
        <p style="color: #666; font-size: 14px; margin-top: 16px;">Tips for taking good wheel photos:</p>
        <ul style="color: #666; font-size: 14px; padding-left: 20px;">
          <li>Take photos in good lighting</li>
          <li>Include close-ups of any damage</li>
          <li>Take photos of all wheels that need work</li>
          <li>Include full wheel shots</li>
        </ul>
      </div>
    `
  }

  // Add professional signature
  content += `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #333; margin-bottom: 24px;">
        If you have any questions in the meantime, please don't hesitate to contact us.
      </p>
      
      <div style="color: #333;">
        <p style="font-weight: bold; color: #3E797F; margin-bottom: 4px;">Tevy Services</p>
        <p style="margin: 0; line-height: 1.5;">
          Unit 63, Yeoford Way<br>
          Marsh Barton, Exeter<br>
          EX2 8LB
        </p>
        <p style="margin: 16px 0;">
          <strong>Tel:</strong> <a href="tel:+447572634898" style="color: #3E797F; text-decoration: none;">+44 7572 634898</a><br>
          <strong>Email:</strong> <a href="mailto:info@tevyservices.co.uk" style="color: #3E797F; text-decoration: none;">info@tevyservices.co.uk</a>
        </p>
        <p style="color: #666; font-style: italic; margin-top: 16px;">By Appointment Only</p>
      </div>

      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
        <p>This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed.</p>
      </div>
    </div>
  </div>
  `

  return content
}

const getAdminEmailContent = (data: any): string => {
  const {
    serviceType,
    serviceDetails,
    contact,
    location,
    distance,
    noPhotosReason
  } = data

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3E797F; margin-bottom: 24px;">New Quote Request</h2>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <h3 style="color: #3E797F; margin-bottom: 16px;">Customer Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 140px;">Name:</td>
            <td style="padding: 8px 0; color: #333;"><strong>${contact.name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Email:</td>
            <td style="padding: 8px 0; color: #333;">
              <a href="mailto:${contact.email}" style="color: #3E797F; text-decoration: none;">
                ${contact.email}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Phone:</td>
            <td style="padding: 8px 0; color: #333;">
              <a href="tel:${contact.phone}" style="color: #3E797F; text-decoration: none;">
                ${contact.phone}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Preferred Contact:</td>
            <td style="padding: 8px 0; color: #333;">${contact.preferredContact}</td>
          </tr>
          ${contact.notes ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Notes:</td>
              <td style="padding: 8px 0; color: #333;">${contact.notes}</td>
            </tr>
          ` : ''}
        </table>
      </div>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <h3 style="color: #3E797F; margin-bottom: 16px;">Service Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 140px;">Service Type:</td>
            <td style="padding: 8px 0; color: #333;"><strong>${serviceType}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Location:</td>
            <td style="padding: 8px 0; color: #333;">${location} (${distance} miles)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Services:</td>
            <td style="padding: 8px 0; color: #333;">${serviceDetails.serviceTypes.join(', ')}</td>
          </tr>
          ${serviceDetails.wheelCount ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Number of Wheels:</td>
              <td style="padding: 8px 0; color: #333;">${serviceDetails.wheelCount}</td>
            </tr>
          ` : ''}
          ${serviceDetails.wheelDetails?.size ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Wheel Size:</td>
              <td style="padding: 8px 0; color: #333;">${serviceDetails.wheelDetails.size}</td>
            </tr>
          ` : ''}
          ${serviceDetails.wheelDetails?.paintColor && serviceDetails.serviceTypes.includes('painted') ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Paint Color:</td>
              <td style="padding: 8px 0; color: #333;">${serviceDetails.wheelDetails.paintColor}</td>
            </tr>
          ` : ''}
        </table>
      </div>

      ${serviceDetails.tyreDetails ? `
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="color: #3E797F; margin-bottom: 16px;">Tyre Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Vehicle Type:</td>
              <td style="padding: 8px 0; color: #333;">${serviceDetails.tyreDetails.vehicleType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Number of Tyres:</td>
              <td style="padding: 8px 0; color: #333;">${serviceDetails.tyreDetails.tyreCount}</td>
            </tr>
            ${serviceDetails.tyreDetails.tyreSize ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">Tyre Size:</td>
                <td style="padding: 8px 0; color: #333;">${serviceDetails.tyreDetails.tyreSize}</td>
              </tr>
            ` : ''}
            ${serviceDetails.tyreDetails.wheelsOnly !== undefined ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">Service Type:</td>
                <td style="padding: 8px 0; color: #333;">
                  ${serviceDetails.tyreDetails.wheelsOnly ? 'Wheels Only' : 'Full Vehicle'}
                </td>
              </tr>
            ` : ''}
            ${serviceDetails.tyreDetails.currentTyres ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">Notes about tyres:</td>
                <td style="padding: 8px 0; color: #333;">${serviceDetails.tyreDetails.currentTyres}</td>
              </tr>
            ` : ''}
          </table>
        </div>
      ` : ''}

      ${noPhotosReason ? `
        <div style="background: #FFF4E5; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <p style="color: #B76E00; margin: 0;">Customer will send photos later</p>
        </div>
      ` : ''}
    </div>
  `
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const data = JSON.parse(formData.get('data') as string)
    const photos = formData.getAll('photos') as File[]

    const resend = new Resend(process.env.RESEND_API_KEY!)

    // Convert File objects to Resend attachments (buffer)
    const photoAttachments = await Promise.all(
      photos.map(async (photo) => ({
        filename: photo.name,
        content: Buffer.from(await photo.arrayBuffer()),
      }))
    )

    // Send emails
    await Promise.all([
      resend.emails.send({
        from: 'web@saunders-simmons.co.uk',
        to: process.env.EMAIL_TO!.split(',').map(e => e.trim()),
        subject: 'New Quote Request',
        html: getAdminEmailContent(data),
        text: '',
        attachments: photoAttachments.length > 0 ? photoAttachments : undefined,
      }),
      resend.emails.send({
        from: 'web@saunders-simmons.co.uk',
        to: data.contact.email,
        subject: 'Your Quote Request',
        html: getCustomerEmailContent(data.contact.name, photos.length > 0),
        text: '',
      })
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send emails' },
      { status: 500 }
    )
  }
}
