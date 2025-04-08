import type { DocumentNode, TypedDocumentNode } from "@apollo/client";

export enum graphqlQueryType {
  server = "server",
  client = "client",
  clientNoCache = "clientNoCache",
}

export type graphqlQueryArgs = {
  clientType: graphqlQueryType;
  query: DocumentNode | TypedDocumentNode<any, any>;
  variables?: {
    [k: string]:
      | string
      | boolean
      | number
      | string[]
      | graphqlQueryArgs["variables"];
  };

  context?: { [k: string]: { [k: string]: string } };
};
