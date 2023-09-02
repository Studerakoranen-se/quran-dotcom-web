// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { SiteSettings } from '~/controllers/SettingController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const keys = req.query.keys as string

  const settings = await SiteSettings.getSettingByKey(keys.split(',') as string[])
  res.status(200).json(settings)
}
