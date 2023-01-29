import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  transform: {
    '^.+.(t|j)sx?$': ['@swc/jest'],
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  clearMocks: true,
  coverageProvider: 'v8',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
