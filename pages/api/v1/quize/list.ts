// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { QuizeController } from "@/controllers/QuizeController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const courses = await QuizeController.index(req.query.lesson_id);
  res.status(200).json(courses);
}
