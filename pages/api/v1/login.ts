// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { AuthController } from "@/controllers/AuthController";
import formData from "@/helpers/formData";
import type { NextApiRequest, NextApiResponse } from "next";
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
  const user = await AuthController.login(data.fields);
  if (user) {
    res.status(200).send({
      success: true,
      msg: "successfully logged in",
      data: user,
    });
  } else {
    res.status(200).send({
      success: false,
      msg: "Wrong credentials",
    });
  }
}
