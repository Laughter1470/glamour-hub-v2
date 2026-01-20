// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    console.log('Email API called')
    const body = await req.json()
    console.log('Request body:', body)

    const emailUser = process.env.EMAIL_USER || 'fidelisemma1470@gmail.com'
    const emailPass = process.env.EMAIL_APP_PASSWORD || 'efpvktmvlolluxzp'

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    // SHOP ORDER FLOW (existing working code - KEEP THIS)
    if (Array.isArray(body.items)) {
      const {
        customerName,
        customerEmail,
        customerPhone,
        address,
        items,
        totalAmount,
        paymentRef,
        date
      } = body

      const customerMailOptions = {
        from: `"Glamour Hub" <${emailUser}>`,
        to: customerEmail,
        subject: `Your Glamour Hub Order Confirmation - #${paymentRef}`,
        html: `
          <h2>Thank you for your order, ${customerName}!</h2>
          <p>We're excited to prepare your items!</p>
          
          <h3>Order Details</h3>
          <ul>
            ${items.map((item: any) => `
              <li>
                ${item.name} × ${item.qty} — ₦${(item.price * item.qty).toLocaleString()}
              </li>
            `).join('')}
          </ul>
          
          <p><strong>Total Paid:</strong> ₦${totalAmount.toLocaleString()}</p>
          <p><strong>Delivery Method:</strong> ${address.includes('Pickup') ? 'Store Pickup' : 'Delivery to ' + address}</p>
          <p><strong>Order Date:</strong> ${date}</p>
          <p><strong>Reference:</strong> ${paymentRef}</p>
          
          <hr />
          <p>Questions? Contact us at 0703 511 8531 or @glamourhub_ng</p>
          <p>See you soon! 💖</p>
        `,
      }

      const ownerMailOptions = {
        from: `"Glamour Hub Orders" <${emailUser}>`,
        to: 'fidelisemma1470@gmail.com',
        subject: `New Order Received! #${paymentRef} - ₦${totalAmount.toLocaleString()}`,
        html: `
          <h2>New Order Alert!</h2>
          <p><strong>Customer:</strong> ${customerName} (${customerEmail}, ${customerPhone})</p>
          <p><strong>Delivery:</strong> ${address}</p>
          <h3>Items:</h3>
          <ul>
            ${items.map((item: any) => `
              <li>${item.name} × ${item.qty} — ₦${(item.price * item.qty).toLocaleString()}</li>
            `).join('')}
          </ul>
          <p><strong>Total:</strong> ₦${totalAmount.toLocaleString()}</p>
          <p><strong>Reference:</strong> ${paymentRef}</p>
          <p><strong>Time:</strong> ${date}</p>
        `,
      }

      await Promise.all([
        transporter.sendMail(customerMailOptions),
        transporter.sendMail(ownerMailOptions),
      ])

      return NextResponse.json({ success: true })
    }

    // BOOKING FLOW (NEW - add this)
    if (body.service && body.customerInfo && body.appointment) {
      const {
        customerInfo,
        service,
        appointment,
        paymentRef,
        totalCost,
        paidCost,
        dateCreated,
      } = body

      const customerMailOptions = {
        from: `"Glamour Hub" <${emailUser}>`,
        to: customerInfo.email,
        subject: `Your Glamour Hub Booking Confirmation - #${paymentRef}`,
        html: `
          <h2>✨ Thank you for booking, ${customerInfo.name}! ✨</h2>
          <p>Your appointment is <strong>confirmed</strong>! 🎉</p>

          <h3>📋 Service Details</h3>
          <ul>
            <li><strong>Service:</strong> ${service.name}</li>
            <li><strong>Description:</strong> ${service.desc || "Standard service"}</li>
            <li><strong>Duration:</strong> ${service.duration}</li>
          </ul>

          <h3>📅 Appointment</h3>
          <p><strong>${appointment.date} at ${appointment.time}</strong></p>

          <h3>💳 Payment Summary</h3>
          <p><strong>Total Price:</strong> ₦${totalCost.toLocaleString()}</p>
          <p><strong>Paid Now:</strong> ₦${paidCost.toLocaleString()}</p>
          <p><strong>Balance Due:</strong> ₦${(totalCost - paidCost).toLocaleString()} (payable on arrival)</p>

          <h3>👤 Your Information</h3>
          <p><strong>Name:</strong> ${customerInfo.name}</p>
          <p><strong>Phone:</strong> ${customerInfo.phone}</p>
          <p><strong>Email:</strong> ${customerInfo.email}</p>
          <p><strong>Special Requests:</strong> ${customerInfo.notes || "None"}</p>

          <hr />
          <p><strong>Reference:</strong> ${paymentRef}</p>
          <p><strong>Created:</strong> ${dateCreated}</p>
          <p>We can't wait to welcome you at Glamour Hub!</p>
          <p><strong>Location:</strong> Holy Trinity Church, Maitama, Abuja</p>
          <p><strong>Contact:</strong> 0703 511 8531 • @glamourhub_ng</p>
          <p>Please arrive 10 minutes early for your appointment. If you need to reschedule, please call us at least 24 hours in advance.</p>
        `,
      }

      const ownerMailOptions = {
        from: `"Glamour Hub Bookings" <${emailUser}>`,
        to: 'fidelisemma1470@gmail.com',
        subject: `🆕 New Booking - ${customerInfo.name} - #${paymentRef}`,
        html: `
          <h2>🆕 New Booking Received!</h2>
          <h3>Customer: ${customerInfo.name}</h3>
          <p>Phone: ${customerInfo.phone} | Email: ${customerInfo.email || "no email"}</p>

          <h3>Service: ${service.name}</h3>
          <p>${service.duration} | ${service.desc || ""}</p>

          <h3>Appointment: ${appointment.date} at ${appointment.time}</h3>

          <h3>Payment</h3>
          <p>Total: ₦${totalCost.toLocaleString()}</p>
          <p>Paid: ₦${paidCost.toLocaleString()}</p>
          <p>Balance: ₦${(totalCost - paidCost).toLocaleString()}</p>

          <p><strong>Ref:</strong> ${paymentRef} | <strong>Created:</strong> ${dateCreated}</p>
          <p><strong>Notes:</strong> ${customerInfo.notes || "None"}</p>
        `,
      }

      await Promise.all([
        transporter.sendMail(customerMailOptions),
        transporter.sendMail(ownerMailOptions),
      ])

      return NextResponse.json({ success: true })
    }

    // CONTACT FORM FLOW (NEW)
if (body.contactForm) {
  const {
    customerName,
    customerEmail,
    customerPhone,
    subject,
    message,
    date
  } = body

  const ownerMailOptions = {
    from: `"Glamour Hub Contact" <${emailUser}>`,
    to: 'fidelisemma1470@gmail.com',
    subject: `🆕 New Contact Form: ${subject || "General Inquiry"}`,
    html: `
      <h2>🆕 New Contact Form Submission</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>👤 Customer Details</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
        <p><strong>Phone:</strong> ${customerPhone || "Not provided"}</p>
      </div>
      
      <h3>📧 Message</h3>
      <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
      <div style="background: white; padding: 20px; border-left: 4px solid #3b82f6; margin: 15px 0;">
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <hr />
      <p><em>Submitted: ${date}</em></p>
      <p><a href="mailto:${customerEmail}">Reply to customer</a></p>
    `,
  }

  await transporter.sendMail(ownerMailOptions)
  return NextResponse.json({ success: true })
}

    // Invalid payload
    return NextResponse.json({ success: false, error: "Invalid payload shape" }, { status: 400 })
  } catch (error) {
    console.error('Email sending failed:', error)
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    )
  }
}
