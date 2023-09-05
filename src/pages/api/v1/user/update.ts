// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { UserController } from '~/controllers/UserController'
import formData from "@/helpers/formData";

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: any = await formData(req)

  const teacher = await UserController.updateUser(req.query.id as string, data.fields)
  res.status(200).send({
    success: true,
    msg: 'Account updated successfully',
    data: teacher,
  })
}
