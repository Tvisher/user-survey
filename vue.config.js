const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  filenameHashing: false,
  productionSourceMap: process.env.NODE_ENV != 'production',
  transpileDependencies: true,
  outputDir: 'docs',
  publicPath: './',
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  }
})
