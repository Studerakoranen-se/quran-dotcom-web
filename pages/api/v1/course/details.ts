// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const dotenv = require("dotenv");
dotenv.config();

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
  let course = await CourseController.view(req.query.id);

  course.image = "/uploads/" + course.image;
  res.status(200).json(course);
}
