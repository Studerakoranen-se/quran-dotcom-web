// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { TeacherController } from '~/controllers/TeacherController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await TeacherController.delete(req.query.id)
  res.status(200).send({
    success: true,
    msg: 'Teacher deleted successfully',
  })
}
