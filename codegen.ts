import type { CodegenConfig } from '@graphql-codegen/cli';

// use npm run generate to generate graphql types for your frontend
const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: ['apps/frontend/src/**/*.ts', 'libs/data-access/src/**/*.ts'],
  generates: {
    'libs/data-access/src/lib/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
