module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:jest/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: [
      './client/tsconfig.json',
      './common/tsconfig.json',
      './server/tsconfig.json',
      './tooling/tsconfig.json',
      './mocks/tsconfig.json'
    ]
  },
  settings: {
    jest: {
      version: 28
    }
  },
  rules: {
    /* Common rules */

    semi: ['error', 'never'],
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'never'],
    'consistent-return': 'off',
    curly: ['error', 'multi-line'],
    'function-paren-newline': 'off',
    'no-await-in-loop': 'off',
    'no-bitwise': 'off',
    'no-continue': 'off',
    'no-irregular-whitespace': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',

    /* Imports / Requires */

    'global-require': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    // To be tweaked to be compatible with VSCode sort extension
    'import/order': 'off',

    /* Typescript */

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['strictCamelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow'
      },
      {
        selector: ['function'],
        format: ['strictCamelCase', 'PascalCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '_' }],
    '@typescript-eslint/no-use-before-define': 'off',

    /* Jest */

    'jest/no-done-callback': 'off',
    'jest/expect-expect': 'off',

    /* Accessibility */

    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'onClick']
      }
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],

    /* React */

    'react-hooks/exhaustive-deps': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-key': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unused-prop-types': [1],
    'react/prop-types': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/no-unstable-nested-components': [
      'off' | 'warn' | 'error',
      { allowAsProps: true | false }
    ]
  },
  ignorePatterns: ['.eslintrc.js']
}
