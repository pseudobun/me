module.exports = {
  root: true,
  extends: ['next/core-web-vitals', '../../.eslintrc.cjs'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-empty-function': 0,
    'global-require': 0,
  },
};
