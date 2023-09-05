// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line import/order
import { LessonFileController } from '~/controllers/LessonFileController'

const dotenv = require('dotenv')

dotenv.config()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const files = await LessonFileController.index(req.query.lesson_id)

  files.forEach((file: any) => {
    // eslint-disable-next-line no-return-assign
    return file.file = `/uploads/files/${file.file}`
  })

  res.status(200).json(files)
}
