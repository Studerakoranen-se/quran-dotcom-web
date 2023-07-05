// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SiteSettings } from "@/controllers/SettingController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(data);

  const settings = await SiteSettings.updateSettingByKey(data);
  res.status(200).json({
    success: true,
    msg: "Setting updated successfully",
  });
}
