// import qs from "qs";
import apolloClientServer from "util/apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { graphqlQueryArgs, graphqlQueryType } from "types/api/graphql-query";

export function getApiUrl(): string | undefined {
  const NEXT_PUBLIC_STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  // Remove trailing slash if it exists
  if (NEXT_PUBLIC_STRAPI_API_URL) {
    const lastChar = NEXT_PUBLIC_STRAPI_API_URL.charAt(
      NEXT_PUBLIC_STRAPI_API_URL.length - 1,
    );
    return lastChar === "/"
      ? NEXT_PUBLIC_STRAPI_API_URL.slice(0, -1)
      : NEXT_PUBLIC_STRAPI_API_URL;
  }
}

/** Strapi REST Methods */

// export async function fetchCollectionType(type, options = {}) {
//   const { NEXT_PUBLIC_STRAPI_API_URL } = process.env;

//   // Remove trailing slash if it exists
//   const lastChar = NEXT_PUBLIC_STRAPI_API_URL.charAt(
//     NEXT_PUBLIC_STRAPI_API_URL.length - 1,
//   );
//   const apiUrl =
//     lastChar === "/"
//       ? NEXT_PUBLIC_STRAPI_API_URL.slice(0, -1)
//       : NEXT_PUBLIC_STRAPI_API_URL;

//   const queryString = qs.stringify(options);
//   const res = await fetch(`${apiUrl}/${type}?${queryString}`);
//   return await res.json();
// }

// // Advanced api fetch
// export async function apiRequest(apiPath, options) {
//   const defaults = {
//     headers: {
//       "content-type": "application/json",
//     },
//   };

//   const combinedOptions = {
//     ...defaults,
//     ...options,
//     headers: {
//       ...defaults.headers,
//       ...options.headers,
//     },
//     // check if dontStringify is set
//     body: options.dontStringify ? options.body : JSON.stringify(options.body),
//   };

//   if (options.removeContentType) {
//     delete combinedOptions.headers["content-type"];
//   }

//   return await fetch(`${apiPath}`, combinedOptions)
//     .then((res) => {
//       if (res.status >= 200 && res.status < 300) {
//         return res.json();
//       } else {
//         throw res;
//       }
//     })
//     .catch((err) => {
//       if (err.json) {
//         return err.json().then((error_json) => {
//           throw error_json;
//         });
//       } else {
//         throw err;
//       }
//     });
// }

/** Strapi Graphql Methods */

export async function graphqlQuery<CollectionType>({
  clientType,
  query,
  variables = {},
  context = {},
}: graphqlQueryArgs): Promise<ApolloQueryResult<CollectionType>> {
  let client;

  switch (clientType) {
    case graphqlQueryType.server: {
      client = apolloClientServer;
      break;
    }
    default: {
      client = apolloClientServer;
    }
  }

  try {
    return await client.query({
      query,
      variables,
      context,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/** Preview Route */
/** Add generated types during Assembly phase */

// export async function apiPreviewRequest(
//   previewId: string,
//   secret: string,
// ): Promise<any> { // Replace Me
//   return await graphqlQuery({
//     clientType: graphqlQueryType.server,
//     query: PreviewQuery, // Replace Me
//     variables: { id: previewId },
//     context: { headers: { Authorization: `Bearer ${secret}` } },
//   }).then((res: ApolloQueryResult<Preview>) => { // Replace Me
//     return res.data.previewPreview.data.attributes;
//   });
// }

// export async function apiPreviewRedirect(
//   contentType: string,
//   slug?: string,
// ): Promise<string> {
//   switch (contentType) {
//     case "article": {
//       return `/news/${slug}`;
//     }
//     default: {
//       throw `Invalid Content Type`;
//     }
//   }
// }
