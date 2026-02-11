import * as postmark from 'postmark'

if (!process.env.POSTMARK_API_TOKEN) {
  throw new Error('Missing POSTMARK_API_TOKEN configuration')
}

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!)

// Email templates
const getCustomerEmailContent = (name: string, hasPhotos: boolean) => {
  let content = `
    <h2>Thank you for your quote request, ${name}!</h2>
    <p>We've received your request and will be in touch shortly with a detailed quote for your wheel refurbishment.</p>
  `

  if (!hasPhotos) {
    content += `
      <h3>Sending Photos</h3>
      <p>To help us provide the most accurate quote, please send photos of your wheels to:</p>
      <p><strong>web@saunders-simmons.co.uk</strong></p>
      <p>Tips for taking good wheel photos:</p>
      <ul>
        <li>Take photos in good lighting</li>
        <li>Include close-ups of any damage</li>
        <li>Take photos of all wheels that need work</li>
        <li>Include full wheel shots</li>
      </ul>
    `
  }

  return content
}

const getAdminEmailContent = (data: any) => {
  const {
    serviceType,
    serviceDetails,
    contact,
    location,
    distance,
    noPhotosReason
  } = data

  return `
    <h2>New Quote Request</h2>

    <h3>Customer Details</h3>
    <p>Name: ${contact.name}</p>
    <p>Email: ${contact.email}</p>
    <p>Phone: ${contact.phone}</p>
    <p>Preferred Contact: ${contact.preferredContact}</p>
    ${contact.notes ? `<p>Additional Notes: ${contact.notes}</p>` : ''}

    <h3>Service Details</h3>
    <p>Service Type: ${serviceType}</p>
    <p>Location: ${location} (${distance} miles)</p>
    <p>Selected Services: ${serviceDetails.serviceTypes.join(', ')}</p>

    ${serviceDetails.wheelCount ? `<p>Number of Wheels: ${serviceDetails.wheelCount}</p>` : ''}

    ${serviceDetails.tyreDetails ? `
      <h3>Tyre Details</h3>
      <p>Vehicle Type: ${serviceDetails.tyreDetails.vehicleType}</p>
      <p>Number of Tyres: ${serviceDetails.tyreDetails.tyreCount}</p>
      ${serviceDetails.tyreDetails.tyreSize ? `<p>Tyre Size: ${serviceDetails.tyreDetails.tyreSize}</p>` : ''}
      ${serviceDetails.tyreDetails.wheelsOnly !== undefined ? `<p>Service Type: ${serviceDetails.tyreDetails.wheelsOnly ? 'Wheels Only' : 'Full Vehicle'}</p>` : ''}
      ${serviceDetails.tyreDetails.currentTyres ? `<p>Additional Info: ${serviceDetails.tyreDetails.currentTyres}</p>` : ''}
    ` : ''}

    ${noPhotosReason ? '<p>Customer will send photos later</p>' : ''}
  `
}

export const sendEmails = async (formData: any, photos: File[]) => {
  try {
    // Convert File objects to Postmark attachments (base64)
    const photoAttachments: postmark.Attachment[] = await Promise.all(
      photos.map(async (photo) => ({
        Name: photo.name,
        Content: Buffer.from(await photo.arrayBuffer()).toString('base64'),
        ContentType: photo.type || 'image/jpeg',
      }))
    )

    // Send both emails
    await Promise.all([
      client.sendEmail({
        From: process.env.EMAIL_FROM!,
        To: process.env.EMAIL_TO!,
        Subject: 'New Quote Request',
        HtmlBody: getAdminEmailContent(formData),
        TextBody: '',
        Attachments: photoAttachments.length > 0 ? photoAttachments : undefined,
      }),
      client.sendEmail({
        From: process.env.EMAIL_FROM!,
        To: formData.contact.email,
        Subject: 'Your Wheel Refurbishment Quote Request',
        HtmlBody: getCustomerEmailContent(formData.contact.name, photos.length > 0),
        TextBody: '',
      })
    ])

    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: 'Failed to send emails' }
  }
}