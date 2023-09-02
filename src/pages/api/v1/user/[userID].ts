// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { UserController } from '~/controllers/UserController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await UserController.getUser(req.query.userID as string)
  res.status(200).json(user)
}
