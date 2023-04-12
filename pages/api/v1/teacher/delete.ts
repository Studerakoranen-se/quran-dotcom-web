// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { TeacherController } from "@/controllers/TeacherController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await TeacherController.delete(req.query.id);
  res.status(200).send({
    success: true,
    msg: "Teacher deleted successfully",
  });
}
