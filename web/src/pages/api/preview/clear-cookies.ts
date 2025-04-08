import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> {
  try {
    res.clearPreviewData();

    return res.status(200).json({
      message: "preview data cookies cleared",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to clear previewData cookies",
      error: JSON.stringify(err),
    });
  }
}
