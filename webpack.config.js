module.exports = {
  entry: "./lib/app.js",
  output: {
    path: "./lib",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js"]
  }
};
