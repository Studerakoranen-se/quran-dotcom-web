// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const dotenv = require("dotenv");
dotenv.config();
import { LessonFileController } from "@/controllers/LessonFileController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const files = await LessonFileController.index(req.query.lesson_id);

  files.forEach((file: any) => (file.file = "/uploads/files/" + file.file));
  res.status(200).json(files);
}
