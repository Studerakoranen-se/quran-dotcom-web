import React from 'react'
// eslint-disable-next-line import/order
import nodemailer from 'nodemailer'

import { render } from '@react-email/components'
import type { ConfirmationEmailProps } from '~/components/Email/ConfirmationEmail'
import ConfirmationEmail from '~/components/Email/ConfirmationEmail'
import type { ConfirmationTutorEmailProps } from '~/components/Email/ConfirmationTutorEmail'
import ConfirmationTutorEmail from '~/components/Email/ConfirmationTutorEmail'
import type { ContactEmailProps } from '~/components/Email/ContactEmail'
import ContactEmail from '~/components/Email/ContactEmail'
import type { ContactEmailAdminProps } from '~/components/Email/ContactEmailAdmin'
import ContactEmailAdmin from '~/components/Email/ContactEmailAdmin'

const Email = process.env.NODE_MAILER_EMAIL
const password = process.env.NODE_MAILER_PASSWORD

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

const EMAIL_TEMPLATE = {
  CONFIRMATION_STUDENT: ConfirmationEmail,
  CONFIRMATION_TUTOR: ConfirmationTutorEmail,
  CONTACT_FORM_ADMIN: ContactEmailAdmin,
  CONTACT_FORM_USER: ContactEmail,
} as const

export type EmailTemplateKeys = keyof typeof EMAIL_TEMPLATE

export async function sendEmail({
  attachment,
  data,
  from,
  replyTo,
  subject,
  template = 'CONFIRMATION_STUDENT',
  to,
}: {
  attachment?: { content: Buffer; contentType: string; filename: string } | undefined
  data:
    | ConfirmationEmailProps
    | ConfirmationTutorEmailProps
    | ContactEmailAdminProps
    | ContactEmailProps
  from?: string
  replyTo?: string
  subject: string
  template: keyof typeof EMAIL_TEMPLATE
  to: string
}) {
  const Template = EMAIL_TEMPLATE[template] as React.ComponentType<any>

  // eslint-disable-next-line react/jsx-props-no-spreading
  const emailHtml = await render(<Template {...data} />)

  const res = await transporter.sendMail({
    attachments: attachment ? [attachment] : [],
    from,
    html: emailHtml,
    replyTo,
    subject,
    to: [to],
  })

  return res
}
