import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://rickandmortyapi.com/graphql",
  documents: "src/api/graphql/**/*.graphql",
  generates: {
    "./src/api/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        useTypeImports: true,
      },
      config: {
        // Respect the actual schema nullability
        useTypeImports: true,
        // Don't force non-optionals when schema says they can be null
        avoidOptionals: {
          field: false, // Changed to false - respect schema nullability
          inputValue: false,
          object: false,
        },
        maybeValue: "T | null", // Respect actual nullability
        inputMaybeValue: "T | null | undefined",
        strictScalars: true,
        defaultScalarType: "unknown",
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        scalars: {
          Upload: "File | Blob",
        },
      },
    },
  },
};

export default config;
