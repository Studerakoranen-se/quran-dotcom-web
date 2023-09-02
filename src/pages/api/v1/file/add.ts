// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { uploadFile, formData } from '~/utils'
import { LessonFileController } from '~/controllers/LessonFileController'

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: any = await formData(req)
  if (data.files.file) {
    const fileName = await uploadFile(data.files.file)
    data.fields.file = fileName
  }
  const lesson = await LessonFileController.create(data.fields)
  res.status(200).send({
    success: true,
    msg: 'File added successfully',
    data: lesson,
  })
}
