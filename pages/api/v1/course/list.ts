// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CourseController } from "@/controllers/CourseController";
import { db } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const courses = await CourseController.index();
  res.status(200).json(courses);
}
