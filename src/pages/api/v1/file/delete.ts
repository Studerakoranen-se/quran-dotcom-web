// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { LessonFileController } from '~/controllers/LessonFileController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await LessonFileController.delete(req.query.id)
  res.status(200).send({
    success: true,
    msg: 'File deleted successfully',
  })
}
