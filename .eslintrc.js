module.exports = {
  globals: {
    NODE_ENV: true,
  },
  env: {
    es6: true,
    node: true,
    browser: true,
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
    // 'linebreak-style': 0,
  },
};
