const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'clickstream.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Clickstream',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}; 