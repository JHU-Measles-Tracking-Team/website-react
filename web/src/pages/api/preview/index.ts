export {};
// import { NextApiRequest, NextApiResponse } from "next";
// import { graphqlQuery } from "util/api";
// import { graphqlQueryType } from "types/api/graphql-query";
// import { previewQuery } from "util/gql/preview";
// import { Preview } from "util/gql/__generated__/Preview";

// type TPreviewProps = {
//   contentType: "article";
//   previewId: string;
//   token: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { previewId, token } = req.query as TPreviewProps;

//   let preview;

//   const context = {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     /** Generate types and add them here in Assembly */
//     const previewRes = await graphqlQuery<Preview>({
//       clientType: graphqlQueryType.server,
//       query: previewQuery,
//       variables: {
//         previewPreviewId: previewId,
//       },
//       context,
//     });
//     preview = previewRes.data;
//   } catch (err) {
//     return res.status(500).json({
//       message: "Unable to find preview id.",
//       error: JSON.stringify(err),
//     });
//   }

//   let redirectUrl: string;

//   switch (preview.previewPreview.data.attributes.contentType) {
//     case "article": {
//       redirectUrl = `/news/${preview.previewPreview.data.attributes.data.slug}`;
//     }

//     default:
//   }

//   // Enable Preview Mode by setting the cookies
//   res.setPreviewData(
//     {
//       token,
//       previewId,
//       slug: preview.previewPreview.data.attributes.data.slug,
//     },
//     {
//       maxAge: 60 * 60,
//     },
//   );
//   // Redirect to the path from the fetched post
//   res.redirect(redirectUrl);
// }
