module.exports = {
  // 修改这一行
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/mj-mobile-vue2-vant2/' // GitHub Pages 仓库名路径
      : '/', // 开发环境

  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8080,
    open: true
  }
}
