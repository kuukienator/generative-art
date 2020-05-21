const path = require('path');

module.exports = {
    entry: './src/generative-art.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'awesome-typescript-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'generative-art.js',
      path: path.resolve(__dirname, 'built'),
    },
  };