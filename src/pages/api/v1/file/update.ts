// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { formData, uploadFile } from '~/utils'
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
  const file = await LessonFileController.update(req.query.id, data.fields)
  res.status(200).send({
    success: true,
    msg: 'File updated successfully',
    data: file,
  })
}
