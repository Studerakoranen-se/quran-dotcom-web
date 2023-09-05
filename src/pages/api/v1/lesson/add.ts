// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { LessonController } from '~/controllers/LessonController'
import formData from "@/helpers/formData";

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: any = await formData(req)

  const lesson = await LessonController.create(data.fields)
  res.status(200).send({
    success: true,
    msg: 'Lesson created successfully',
    data: lesson,
  })
}
