// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendMail, formData } from '~/utils'

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fields }: any = await formData(req)

  console.log(fields)

  sendMail(fields.to, fields.subject, fields.text)

  res.status(200).send({
    success: true,
    msg: 'Application sended successfully',
  })
}
