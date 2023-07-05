// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { UserController } from "@/controllers/UserController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = await UserController.getUser(req.query.userID as string);
  res.status(200).json(user);
}
