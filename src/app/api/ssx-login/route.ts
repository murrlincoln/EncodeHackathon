import { NextApiRequest, NextApiResponse } from "next";
import ssx from "../_ssx/route";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
    await ssx.login(
      req.body.siwe,
      req.body.signature,
      req.body.daoLogin,
      req.body.resolveEns,
      req.cookies.nonce || "",
      req.body.resolveLens,
    )
  );
}