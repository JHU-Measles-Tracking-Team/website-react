import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../cms/schema.graphql",
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/util/gql/__generated__/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
