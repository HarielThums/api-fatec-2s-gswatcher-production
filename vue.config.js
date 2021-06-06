module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  },
};
