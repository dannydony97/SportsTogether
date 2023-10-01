module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['warn', {allowExpressions: true}],
        '@typescript-eslint/no-shadow': 0,
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 0,
      },
    },
  ],
};
