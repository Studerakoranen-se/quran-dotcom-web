// eslint-disable-next-line import/order
import nodemailer from 'nodemailer'

const dotenv = require('dotenv')

dotenv.config()

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
})

// eslint-disable-next-line import/prefer-default-export
export async function sendMail(to: string, subject: string, body: string) {
  const mailOptions = {
    from: process.env.MAILTRAP_FROM_EMAIL,
    to,
    subject,
    html: body,
  }

  const info = await transporter.sendMail(mailOptions)

  // eslint-disable-next-line no-console
  console.log(`Message sent: ${info.messageId}`)
}
