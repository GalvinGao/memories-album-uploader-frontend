module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8010'
      }
    }
  },
  integrity: true,
  runtimeCompiler: true
}
