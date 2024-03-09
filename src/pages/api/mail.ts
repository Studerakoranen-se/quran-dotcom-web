import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import ConfirmationEmail from '~/components/Email/ConfirmationEmail'
import ConfirmationTutorEmail from '~/components/Email/ConfirmationTutorEmail'
import { localizedApplicationStrings } from '~/components/Email/localizedStrings'

const Email = process.env.NODE_MAILER_EMAIL
const password = process.env.NODE_MAILER_PASSWORD

type Data = {
  message?: string
  success?: boolean
}

export interface CustomApiRequest extends NextApiRequest {
  file?: any
}

function hasEmailInTitle(arr) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/

  const objWithEmail = arr.find((obj) => emailRegex.test(obj.text))

  return objWithEmail ? objWithEmail.text.match(emailRegex)[0] : null
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: Email,
    pass: password,
  },
  logger: true,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (
    req.method === 'POST' &&
    req.body &&
    req.body.teacher &&
    hasEmailInTitle(req.body.teacher.extraFields) !== null
  ) {
    const { body } = req

    const strings = localizedApplicationStrings[body.locale || 'ar']

    try {
      await Promise.all([
        transporter.sendMail({
          from: Email, // from Studera Koranen
          to: hasEmailInTitle(body.teacher.extraFields), // To the teacher,
          cc: `studerakoranen@gmail.com`, // To Administator
          subject: `${body.firstName} ${body.lastName}!`,
          html: render(ConfirmationTutorEmail(body)),
        }),

        transporter.sendMail({
          from: Email, // from Studera Koranen
          to: body.email, // to the student
          subject: `${strings.previewText} ${body.firstName} ${body.lastName}!`,
          html: render(ConfirmationEmail({ locale: body.locale })),
        }),
      ])
      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
  return res.status(400).json({ message: 'Bad Request' })
}
