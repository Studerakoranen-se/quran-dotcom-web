// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { QuizeController } from "@/controllers/QuizeController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await QuizeController.delete(req.query.id);
  res.status(200).send({
    success: true,
    msg: "Quize deleted successfully",
  });
}
