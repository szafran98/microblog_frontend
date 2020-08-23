const path = require('path')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
          path.resolve(__dirname, './src/scss/*.scss'),
      ]
    }
  }
}
