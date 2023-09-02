import { NextApiRequest } from 'next'
import Error from 'next/error'
import formidable from 'formidable'

const formData = async (req: NextApiRequest) => {
  return await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true })
    form.parse(req, (err: Error, fields: any, files: any) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
}

export default formData
