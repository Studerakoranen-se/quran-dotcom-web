// pages/api/image.js
import path from 'path'
import fs from 'fs'

export default function handler(req, res) {
  if (req.method === 'GET') {
    const imageName = req.query.name
    const imagePath = path.join(process.cwd(), 'public', 'uploads', imageName)

    // Check if the file exists
    if (fs.existsSync(imagePath)) {
      // Determine the content type based on the file extension
      const ext = path.extname(imagePath).toLowerCase()
      let contentType = ''

      switch (ext) {
        case '.png':
          contentType = 'image/png'
          break
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg'
          break
        case '.svg':
          contentType = 'image/svg+xml'
          break
        default:
          contentType = 'application/octet-stream'
      }

      const imageStream = fs.createReadStream(imagePath)
      res.setHeader('Content-Type', contentType)
      imageStream.pipe(res)
    } else {
      res.status(404).end()
    }
  } else {
    res.status(405).end()
  }
}
