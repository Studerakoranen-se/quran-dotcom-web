// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CourseController } from "@/controllers/CourseController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await CourseController.delete(req.query.id);
  res.status(200).send({
    success: true,
    msg: "Course deleted successfully",
  });
}
