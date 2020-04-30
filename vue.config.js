process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Basket Watch'
        }
    }
}