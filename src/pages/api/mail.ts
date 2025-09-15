import type { NextApiRequest, NextApiResponse } from 'next'
import { localizedApplicationStrings } from '~/components/Email/localizedStrings'
import { rateLimitByKey } from '~/utils/limiter'
import { sendEmail } from '~/utils/send-email'

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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (
    req.method === 'POST' &&
    req.body &&
    req.body.teacher &&
    hasEmailInTitle(req.body.teacher.extraFields) !== null
  ) {
    const { body } = req

    const strings = localizedApplicationStrings[body.locale || 'ar']

    await rateLimitByKey({ key: body.email, limit: 1, window: 30000 })

    try {
      // 1) Send to the teacher inbox with Reply-To set to the user's email
      await sendEmail({
        data: body,
        replyTo: body.email,
        subject: `New Student ${body?.firstName} ${body?.lastName}`,
        template: 'CONFIRMATION_TUTOR',
        to: hasEmailInTitle(body.teacher.extraFields), // To the teacher,
      })

      // 2) Auto-reply to the user confirming receipt
      await sendEmail({
        data: body,
        subject: `${strings.previewText} ${body.firstName} ${body.lastName}!`,
        template: 'CONFIRMATION_STUDENT',
        to: body.email,
      })

      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
  return res.status(400).json({ message: 'Bad Request' })
}
