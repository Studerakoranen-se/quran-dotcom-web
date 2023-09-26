const path = require('path')

module.exports = {
  globals: {
    __translationGroup: 'readonly',
  },
  extends: ['plugin:@next/next/recommended', '@noaignite/eslint-config-typescript'],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './webpackBaseConfig.js'),
      },
    },
  },
  rules: {
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/no-cycle': 'off',
    'no-unsafe-optional-chaining': 'off',
  },
}
