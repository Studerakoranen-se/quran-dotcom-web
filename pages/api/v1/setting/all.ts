// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SiteSettings } from "@/controllers/SettingController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const settings = await SiteSettings.getAllSettings();
  res.status(200).json(settings);
}
