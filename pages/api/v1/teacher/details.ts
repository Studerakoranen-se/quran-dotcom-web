// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const dotenv = require("dotenv");
dotenv.config();

import { TeacherController } from "@/controllers/TeacherController";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let teacher = await TeacherController.view(req.query.id as string);

  teacher.image = "/uploads/" + teacher.image;
  res.status(200).json(teacher);
}
