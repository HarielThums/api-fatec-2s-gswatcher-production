module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8080,
  },
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  },
};
