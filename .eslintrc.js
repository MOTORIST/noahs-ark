module.exports = {
  globals: {
    NODE_ENV: true,
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    babelOptions: {
      configFile: '.babelrc',
    },
  },
  extends: ['airbnb-base', 'prettier'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    // 'linebreak-style': 0,
  },
};
