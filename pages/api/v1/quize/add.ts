// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formData from "@/helpers/formData";
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizeController } from "@/controllers/QuizeController";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = await formData(req);

  const quize = await QuizeController.create(data.fields);
  res.status(200).send({
    success: true,
    msg: "Quize created successfully",
    data: quize,
  });
}
