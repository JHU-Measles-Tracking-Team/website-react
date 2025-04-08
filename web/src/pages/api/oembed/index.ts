import { hasProvider, extract, OembedData } from "oembed-parser";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", "max-age=3600");
  const url = req.query.url;

  try {
    if (!url) {
      throw "Must provide OEmbed Url";
    }

    if (!hasProvider(url as string)) {
      throw "OEmbed URL does not have provider";
    }
  } catch (err) {
    res.status(400).json(
      JSON.stringify({
        error: "Bad Request",
        code: 400,
        message: err,
      }),
    );
    return;
  }
  fetchOembedData(url as string)
    .then((data) => {
      res.status(200).json(JSON.stringify(data));
    })
    .catch((err) => {
      console.error(err);
      console.trace(err);

      res.status(500).json(
        JSON.stringify({
          error: "Server Error",
          code: 500,
          message: "An unexpected error occured",
        }),
      );
    });
};

const fetchOembedData = async (url: string): Promise<OembedData> => {
  return await extract(url);
};
