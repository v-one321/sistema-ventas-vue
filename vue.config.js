module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/sistema-ventas-vue/'
      : '/',
  devServer: {
    historyApiFallback: true
  }
}