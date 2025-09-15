import type { NextApiRequest, NextApiResponse } from 'next'
import { localizedStrings } from '~/components/Email/localizedStrings'
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { body } = req

    const strings = localizedStrings[body.locale || 'ar']

    await rateLimitByKey({ key: body.email, limit: 1, window: 30000 })

    try {
      // 1) Send to the Studera Korranen inbox with Reply-To set to the user's email
      await sendEmail({
        data: body,
        replyTo: body.email,
        subject: `Studera Korranen: ${body?.firstName} ${body?.lastName}`,
        template: 'CONTACT_FORM_ADMIN',
        to: Email as string,
      })

      // 2) Auto-reply to the user confirming contact form submission
      await sendEmail({
        data: body,
        subject: `${strings.previewText} ${body.firstName} ${body.lastName}!`,
        template: 'CONTACT_FORM_USER',
        to: body.email,
      })

      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
  return res.status(400).json({ message: 'Bad Request' })
}
