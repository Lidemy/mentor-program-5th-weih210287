module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    jquery: true
  },
  plugins: ['jquery'],
  extends: ['@lidemy/eslint-config-lidemy', 'plugin:jquery/deprecated'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018
  },
  rules: {
    'no-console': 'off'
  }
}
