import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import ContactEmail from '~/components/Email/ContactEmail'
import ContactEmailAdmin from '~/components/Email/ContactEmailAdmin'
import localizedStrings from '~/components/Email/localizedStrings'

const Email = process.env.NODE_MAILER_EMAIL
const password = process.env.NODE_MAILER_PASSWORD

type Data = {
  message?: string
  success?: boolean
}

export interface CustomApiRequest extends NextApiRequest {
  file?: any
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  // host: 'mailout.one.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  // requireTLS: true,
  auth: {
    user: Email,
    pass: password,
  },
  logger: true,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { body } = req

    const strings = localizedStrings[body.locale || 'ar']

    try {
      await Promise.all([
        transporter.sendMail({
          from: Email, // sender address
          to: Email, // list of receivers
          subject: `${body.firstName} ${body.lastName}!`,
          html: render(ContactEmailAdmin({ message: body.message })),
        }),
        transporter.sendMail({
          from: Email, // sender address
          to: body.email, // list of receivers
          subject: `${strings.previewText} ${body.firstName} ${body.lastName}!`,
          html: render(
            ContactEmail({
              locale: body.locale,
            }),
          ),
        }),
      ])

      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
  return res.status(400).json({ message: 'Bad Request' })
}
