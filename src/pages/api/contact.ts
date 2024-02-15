/* eslint-disable no-return-assign */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const Email = process.env.NODE_MAILER_EMAIL
const password = process.env.NODE_MAILER_PASSWORD

type Data = {
  message?: string
  success?: boolean
}

export interface CustomApiRequest extends NextApiRequest {
  file?: any
}

const messageFields = {
  id: 'ID',
  subject: 'Subject',
  firstName: 'Name',
  lastName: 'Surname',
  email: 'Email',
  phone: 'Phone',
  message: 'Message',
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

const generateEmailContent = (data: any) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${messageFields[key as keyof typeof messageFields]}: \n${val} \n \n`),
    '',
  )

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    if (key === 'resume') {
      // Handle documents separately, if needed
    } else if (typeof val === 'string') {
      str += `<h3 class="form-heading" align="left">${
        messageFields[key as keyof typeof messageFields]
      }</h3><p class="form-answer" align="left">${val}</p>`
    }
    return str
  }, '')

  return {
    text: stringData,
    html: htmlData,
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { body } = req

    try {
      await transporter.sendMail({
        from: Email, // sender address
        to: Email, // list of receivers
        ...generateEmailContent(body),
        subject: body.subject,
        // attachments: req?.file
        //   ? [
        //       {
        //         filename: req?.file?.originalname,
        //         path: req?.file?.path,
        //       },
        //     ]
        //   : undefined,
      })
      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
  return res.status(400).json({ message: 'Bad Request' })
}
