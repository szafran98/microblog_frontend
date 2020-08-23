module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            'vue-style-loader',
            'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
              @import "@/assets/scss/variables.scss";
              @import "@/assets/scss/mixins.scss";`
            }
          }
        ]
      }
    ]
  }
}