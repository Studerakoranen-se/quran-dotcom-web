// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { SiteSettings } from '~/controllers/SettingController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const settings = await SiteSettings.getAllSettings()
  res.status(200).json(settings)
}
