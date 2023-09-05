// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line import/order
import { TeacherController } from '~/controllers/TeacherController'

const dotenv = require('dotenv')

dotenv.config()

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const teacher = await TeacherController.view(req.query.id as string)

  teacher.image = `/uploads/${teacher.image}`
  res.status(200).json(teacher)
}
