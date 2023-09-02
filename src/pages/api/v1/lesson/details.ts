// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { LessonController } from '~/controllers/LessonController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lesson = await LessonController.view(req.query.id)

  res.status(200).json(lesson)
}
