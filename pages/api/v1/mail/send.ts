// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formData from "@/helpers/formData";
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizeController } from "@/controllers/QuizeController";
import { sendEmail } from "@/utils/sendMail";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fields }: any = await formData(req);

  console.log(fields);

  sendEmail(fields.to, fields.subject, fields.text);

  res.status(200).send({
    success: true,
    msg: "Application sended successfully",
  });
}
