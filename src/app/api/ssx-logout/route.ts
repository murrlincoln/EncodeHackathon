import { NextApiRequest, NextApiResponse } from "next";
import ssx from "../_ssx/route";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ 
    success: await ssx.logout() ?? true
  });
}