const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '~': path.join(__dirname, './src'),
      '@': path.join(__dirname, './*'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
}
