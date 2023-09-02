// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { LessonFileController } from '~/controllers/LessonFileController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lesson = await LessonFileController.view(req.query.id)

  res.status(200).json(lesson)
}
