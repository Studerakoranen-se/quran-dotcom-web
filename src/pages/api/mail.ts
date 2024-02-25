import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import ConfirmationEmail from '~/components/Email/ConfirmationEmail'
import ConfirmationTutorEmail from '~/components/Email/ConfirmationTutorEmail'

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
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: Email,
    pass: password,
  },
  logger: true,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST' && req.body && req.body.teacher && req.body.teacher.mail) {
    const { body } = req

    try {
      await Promise.all([
        transporter.sendMail({
          from: Email, // from Studera Koranen
          to: req.body.teacher.mail, // To the teacher,
          cc: `studerakoranen@gmail.com`, // To Administator
          subject: body.subject,
          html: render(ConfirmationTutorEmail(body)),
        }),

        transporter.sendMail({
          from: Email, // from Studera Koranen
          to: body.email, // to the student
          subject: `Ansökan till Studera Koranen: ${body.firstName} ${body.lastName}`,
          html: render(ConfirmationEmail({ firstName: body.firstName, lastName: body.lastName })),
        }),
      ])
      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
  return res.status(400).json({ message: 'Bad Request' })
}
