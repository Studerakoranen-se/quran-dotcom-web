// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { TeacherController } from "@/controllers/TeacherController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const courses = await TeacherController.index();
  res.status(200).json(courses);
}
