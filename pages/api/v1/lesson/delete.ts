// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { LessonController } from "@/controllers/LessonController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await LessonController.delete(req.query.id);
  res.status(200).send({
    success: true,
    msg: "Lesson deleted successfully",
  });
}
